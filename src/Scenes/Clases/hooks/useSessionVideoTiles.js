import { useEffect, useState } from "react";

const useSessionVideoTiles = (session) => {
    const [videoTiles, setVideoTiles] = useState([]);

    useEffect(() => {
        if (session) {
            session.audioVideo.addObserver({
                videoTileDidUpdate: (tile) => {
                    // only append tile, which have an attendee id are not local and are not content oriented (screen sharing)
                    if (tile.boundAttendeeId && !tile.localTile && !tile.isContent) {
                        setVideoTiles((prevTiles) => {
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
                },
                videoTileWasRemoved: (tileId) => {
                    setVideoTiles((prevTiles) => {
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
            });
        }
    }, [session]);

    return videoTiles;
};

export default useSessionVideoTiles;
