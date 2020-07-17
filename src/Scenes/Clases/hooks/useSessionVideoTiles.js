import { useEffect, useState } from "react";

const useSessionVideoTiles = (session) => {
    const [localVideoTile, setLocalVideoTile] = useState(null);
    const [remoteVideoTiles, setRemoteVideoTiles] = useState([]);

    useEffect(() => {
        if (session) {
            console.log(session);
            session.audioVideo.addObserver({
                videoTileDidUpdate: (tile) => {
                    // only append tile, which have an attendee id are not local and are not content oriented (screen sharing)
                    if (tile.boundAttendeeId && !tile.isContent) { //&& !tile.localTile 
                        if(!tile.localTile) {
                            setRemoteVideoTiles((prevTiles) => {
                                const existingTileIndex = prevTiles.findIndex(
                                    ({ tileId }) => tileId === tile.tileId
                                );
                                // replace existing tile with updated one
                                if (existingTileIndex >= 0) {
                                    prevTiles.splice(existingTileIndex, 1, tile);
                                    return prevTiles;
                                } else {
                                    return [tile, ...prevTiles];
                                }
                            });
                        }
                        else {
                            setLocalVideoTile(tile);
                        }
                    }
                    else {
                        console.log('Nop');
                    }
                },
                videoTileWasRemoved: (tileId) => {
                    if(!localVideoTile || localVideoTile.tileId !== tileId) {
                        setRemoteVideoTiles((prevTiles) => {
                            // find index of removed tile
                            const removedTileIndex = prevTiles.findIndex(
                                (tile) => tile.tileId === tileId
                            );
                            // splice out the removed tile
                            if (removedTileIndex >= 0) {
                                prevTiles.splice(removedTileIndex, 1);
                            }
                            return prevTiles;
                        });
                    }
                    else {
                        setLocalVideoTile(null);
                    }
                }
            });
        }
    }, [session]);

    return {
        localVideoTile,
        remoteVideoTiles
    };
};

export default useSessionVideoTiles;
