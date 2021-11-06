import React from 'react';
import MapView, { Callout, Circle, Geojson, Marker, Polyline } from 'react-native-maps';
import { Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { parse } from '@babel/core';
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
    const [coords, setCoords] = React.useState([]);


    const iSPointsNear = (checkPoint, centerPoint, km = 20) => {
        var ky = 40000 / 360;
        console.log('km::::::: ', km);
        km = km / 1000;
        var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
        var dx = Math.abs(centerPoint.latitude - checkPoint.latitude) * kx;
        var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
        console.log('dx::::::: ', dx);
        console.log('dy::::::: ', dy);
        return Math.sqrt(dx * dx + dy * dy) <= km;
    }
    React.useEffect(() => {
        let isMounted = true
        const intervalId = setInterval(async () => {  //assign interval to a variaable to clear it
            try {
                if (!isMounted) return;
                console.log(Math.random());
                setRegion({
                    latitude: parseFloat(`${Math.random() * 100}`),
                    longitude: parseFloat(`73.${Math.random()}`),
                });
            } catch (error) {
            }
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);
    const myPlace = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: [33.630295080717026, 73.04190052965001],
                }
            }
        ]
    };

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
                onLongPress={(e) => {
                    console.log(e.nativeEvent.coordinate);
                    if (iSPointsNear(e.nativeEvent.coordinate, {
                        latitude: 33.630295080717026,
                        longitude: 73.04190052965001,
                    }, radius)) {
                        setCoords([...coords, e.nativeEvent.coordinate])
                    }
                    console.log('isPointsNear: ', iSPointsNear(e.nativeEvent.coordinate, {
                        latitude: 33.630295080717026,
                        longitude: 73.04190052965001,
                    }, radius));
                }}
                provider={'google'}
                style={{ width: '100%', height: '60%' }}
                initialRegion={region}
            >
                <Geojson
                    geojson={myPlace}
                    strokeColor="red"
                    fillColor="green"
                    strokeWidth={10}
                />
                <Polyline
                    coordinates={coords}
                    //  lineCap={'butt'}
                    tappable
                    onPress={()=>alert('hi')}
                     lineJoin={'miter'}
                    lineDashPhase={5}
                    strokeWidth={1}
                    geodesic={false}
                />
                {/* direction map api start here*/}
                {/* <MapViewDirections
                   mode='WALKING'
                    origin={region}
                    destination={pin}
                    apikey={'AIzaSyCHIlIvmsXf-sllfpXK0Q-1dV7uzgyFvfw'}
                /> */}
                {coords.map((coord, index) => <Marker key={index}
                    onPress={(e) => {
                        console.log(e.nativeEvent.coordinate);
                        let copy = [...coords];
                        console.log('arrays: ', copy);
                        coords.forEach((el, i) => {
                            if (JSON.stringify(el) === JSON.stringify(e.nativeEvent.coordinate)) {
                                copy.splice(i, 1);
                                console.log('yes');
                            }
                        });
                        setCoords(copy);
                    }}
                    pinColor={'red'}
                    coordinate={coord}
                />)}
                <Marker
                    pinColor={'blue'}
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
                    fillColor={'rgba(189, 200, 211, 0.31)'}
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