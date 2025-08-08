import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewsCount: string;
  isVerified: boolean;
  isFavorite: boolean;
  categories: string[];
  distance: string;
  status: string;
}

export function RestaurantCard(props: RestaurantProps) {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: props.image }}
        style={styles.image}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.imageOverlay}>
          {props.isVerified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#FFF" />
              <Text style={styles.verifiedText}>Verificado</Text>
            </View>
          )}
          <Ionicons
            name={props.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={props.isFavorite ? '#E51D37' : '#FFF'}
            style={styles.favoriteIcon}
          />
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text style={styles.ratingText}>{props.rating}</Text>
          <Text style={styles.reviewsCount}>{props.reviewsCount}</Text>
        </View>
        <Text style={styles.detailsText}>
          {props.categories.join(' • ')} • {props.distance}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: '100%',
    height: 120,
    justifyContent: 'space-between',
  },
  imageOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 150, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  favoriteIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  reviewsCount: {
    marginLeft: 8,
    color: '#757575',
    fontSize: 12,
  },
  detailsText: {
    color: '#757575',
    fontSize: 12,
  },
});