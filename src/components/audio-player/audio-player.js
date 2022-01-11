import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {
    Event,
    useProgress,
    State,
    usePlaybackState,
    RepeatMode,
    useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import data from '../../constants/music-list'
export const MusicPlayer = () => {
    const playbackStack = usePlaybackState();
    const progress = useProgress();
    React.useEffect(() => {
        (async () => {
            await setupPlayer();
        })()
    }, [])
    const setupPlayer = async () => {
        await TrackPlayer.setupPlayer({});
        TrackPlayer.add(data);
    }
    const togglePlayback = async (playbackStack) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
            if (playbackStack === State.Paused) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text>Audio Player</Text>
            <Ionicons name={'home'} size={20} />
            <Slider
                style={{ width: 200, height: 40 }}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                // minimumTrackTintColor="#FFFFFF"
                // maximumTrackTintColor="#000000"
                onSlidingComplete={async (v) => {
                    await TrackPlayer.seekTo(v);
                }}
            />
            <View style={styles.icon_container}>
                <Text>
                    {new Date(progress.position*1000).toISOString().substr(14,5)}
                </Text>
                <TouchableOpacity onPress={() => togglePlayback(playbackStack)}>
                    <Ionicons name={playbackStack === State.Playing ? `ios-pause-circle` : `ios-play-circle-sharp`} size={20} />
                </TouchableOpacity>
                <Text>
                    {new Date((progress.duration-progress.position)*1000).toISOString().substr(14,5)}
                </Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_container: {
        width: '40%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});