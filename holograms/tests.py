from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models.hologram_model import Hologram  # Upewnij się, że ścieżka jest poprawna

class HologramListViewTests(APITestCase):
    def setUp(self):
        """
        Set up initial data for tests.
        """
        self.hologram1 = Hologram.objects.create(
            name='Unicorn',
            weight=500,
            superpower='Magic',
            extinct_since='1800 CE'
        )
        self.hologram2 = Hologram.objects.create(
            name='Dragon',
            weight=2000,
            superpower='Firebreath',
            extinct_since='1667 CE'
        )
        self.hologram3 = Hologram.objects.create(
            name='Dodo',
            weight=10,
            superpower='None',
            extinct_since='1667 CE'
        )

    def test_list_holograms(self):
        """
        Ensure we can list holograms.
        """
        url = reverse('holograms:hologram-list')  # Use namespaced URL pattern
        response = self.client.get(url)
        print(response.data)  # Print response data for debugging
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  # Check that we have 3 holograms

    def test_create_hologram(self):
        """
        Ensure we can create a new hologram.
        """
        url = reverse('holograms:hologram-list')  # Use namespaced URL pattern
        data = {
            'name': 'Phoenix',
            'weight': 1000,
            'superpower': 'Rebirth',
            'extinct_since': '1667 CE'
        }
        response = self.client.post(url, data, format='json')
        print(response.data)  # Print response data for debugging
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Hologram.objects.count(), 4)
        self.assertEqual(Hologram.objects.get(pk=response.data['id']).name, 'Phoenix')

    def test_ordering(self):
        """
        Ensure we can order holograms by the 'name' field.
        """
        url = reverse('holograms:hologram-list') + '?ordering=name'  # Use namespaced URL pattern
        response = self.client.get(url)
        print(response.data)  # Print response data for debugging
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check if the order is correct
        self.assertEqual(response.data[0]['name'], 'Dodo')
        self.assertEqual(response.data[1]['name'], 'Dragon')
        self.assertEqual(response.data[2]['name'], 'Unicorn')
