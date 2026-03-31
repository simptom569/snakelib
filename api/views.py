from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "email": request.user.email
        })