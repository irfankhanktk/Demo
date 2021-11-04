import React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
export const MapDemo = ({ radius = 500 }) => {
    const [pin, setPin] = React.useState({
        latitude: 33.630295080717026,
        longitude: 73.04190052965001,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [region, setRegion] = React.useState({
        latitude: 33.630295080717026,
        longitude: 73.04190052965001,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    return (
        <View style={{ flex: 1, }}>
            <GooglePlacesAutocomplete
                GooglePlacesSearchQuery={
                    {
                        rankby: 'distance'
                    }
                }
                styles={{
                    container: { width: '100%', flex: 0 },
                    listView: { backgroundColor: 'white' },
                }}
                fetchDetails={true}
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setRegion(
                        {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        }
                    )
                }}
                query={{
                    key: 'AIzaSyCHIlIvmsXf-sllfpXK0Q-1dV7uzgyFvfw',
                    language: 'en',
                    components: 'country:pk',
                    type: '(cities)',
                    radius: radius,
                    location: `${region.latitude},${region.longitude}`
                }}
                onFail={(error) => console.error('error', error)}
            // requestUrl={{
            //     url:
            //         'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            //     useOnPlatform: 'web',
            // }}
            />
            <MapView
                provider={'google'}
                style={{ width: '100%', height: '60%' }}
                initialRegion={region}
            >
                {/* direction map api start here*/}
                <MapViewDirections
                    origin={region}
                    destination={pin}
                    apikey={GOOGLE_MAPS_APIKEY}
                />

                <Marker
                    pinColor={'red'}
                    coordinate={region}
                />
                <Marker
                    draggable
                    pinColor={'red'}
                    coordinate={pin}
                    onDragStart={(e) => {
                        console.log(e.nativeEvent.coordinate);

                    }}
                    onDragEnd={(e) => {
                        console.log(e.nativeEvent.coordinate);
                        setPin({
                            longitude: e.nativeEvent.coordinate.longitude,
                            latitude: e.nativeEvent.coordinate.latitude
                        })

                    }}
                >
                    <Callout>
                        <Text>I am here</Text>
                    </Callout>
                </Marker>
                <Circle
                    fillColor={'red'}
                    radius={radius}
                    center={
                        {
                            latitude: 33.630295080717026,
                            longitude: 73.04190052965001,
                        }
                    }
                />
            </MapView>
        </View>
    );
}