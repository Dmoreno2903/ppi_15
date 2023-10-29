
# Se importan los modelos necesarios
from .models import Eps
from .models import Ips
from .models import Usuario
from .models import Triaje
from .models import PerfilUsuario

# Se importan los serializadores de cada modelo
from .serializers import EpsSerializer
from .serializers import IpsSerializer
from .serializers import UsuarioSerializer
from .serializers import TriajeSerializer
from .serializers import PerfilUsuarioSerializer

# Se importan las librerías necesarias
import pandas as pd
import geopandas as gp
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action


# Se crea la vista de la relación EPS
class EpsViewSet(viewsets.ModelViewSet):
    queryset = Eps.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EpsSerializer

# Se crea la vista de la relación IPS
class IpsViewSet(viewsets.ModelViewSet):
    queryset = Ips.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = IpsSerializer

    @action(detail=False, methods=['post'], url_path='filtro')
    def filter_ips(self, request):

        ''' La función recibe el tirage realizado por el usuario y cálcula mediante un cálculo ponderado entre distancia
        y tiempo de atención las 3 mejores opciones de IPS a elegir por el usuario '''

        try:
            crs = 'EPSG:21897'

            # Obtenemos el último trije
            last_triage = pd.DataFrame(list((Triaje.objects.all()).values())).iloc[-1]

            # Seleccionamos el usuario y el triage
            usuario = last_triage['user_id']
            triage = last_triage['triage_calculado']

            # Obtenemos las coordenadas del usuario
            usuarios = pd.DataFrame(list((PerfilUsuario.objects.all()).values()))
            usuarios = usuarios[usuarios['user_id'] == usuario]

            latitud = usuarios['latitud']
            longitud = usuarios['longitud']

            coord_usuario = pd.DataFrame({
                "latitud": latitud,
                "longitud": longitud
            })

            coord_usuario = gp.GeoDataFrame(
                coord_usuario, geometry = gp.points_from_xy(coord_usuario.longitud, coord_usuario.latitud), crs='EPSG:21897'
            )

            # Obtenemos todas las IPS
            df_ips = pd.DataFrame(list((Ips.objects.all()).values()))

            # Aplicamos el filtro, es decir, seleccionamos únicamente las IPS cuya nivel de complejidad sea mayor o igual al triage
            df_ips = df_ips[df_ips['complejidad'] >= triage]

            # Obtenemos el geoDataFrame
            geo_ips = gp.GeoDataFrame(
                df_ips, geometry = gp.points_from_xy(df_ips.longitud, df_ips.latitud), crs='EPSG:21897'
            )

            # Proyectamos las geometrías a un sistema de coordenadas proyectadas (por ejemplo, UTM)
            coord_usuario = coord_usuario.to_crs(crs)
            geo_ips = geo_ips.to_crs(crs)

            # Calculamos la distancia entre el usuario y los centros de atención
            geo_ips['distancia'] = geo_ips.distance(coord_usuario.iloc[0]['geometry'])

            # Asignamos los pesos a la distancia y al tiempo de atención
            geo_ips['ponderado'] = ((geo_ips['tiempo_urgencias'].astype(int)) * 0.6) + (geo_ips['distancia'] * 0.4) 

            # Ordenamos y seleccionamos las 3 con el cálculo ponderado menor
            ips_validas = geo_ips.sort_values(by='ponderado').iloc[:3]

            # Convertimos a un diccionario
            ips_validas_data = ips_validas.to_dict(orient='records')

            # Serializamos el diccionarios
            ips_validas_serializer = IpsSerializer(ips_validas_data, many=True).data
            
            # Devolvemos un mensaje de éxito y el objeto IPS serializado
            return Response({'message': 'Procesado correctamente', 'ips_validas': ips_validas_serializer})
        except Exception as e:
            # Devuelve un mensaje de error
            return {'message' : str(e)}

# Se crea la vista de la relación Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializer

# Se crea la vista de la relación Triage
class TriajeViewSet(viewsets.ModelViewSet):
    queryset = Triaje.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = TriajeSerializer

# Se crea la vista de la relación Perfil de usuario
class PerfilViewSet(viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = PerfilUsuarioSerializer