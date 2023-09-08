import mapboxgl from "mapbox-gl";
import { Position } from "./interfaces";

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>


function getPosition(map: mapboxgl.Map, setPosition: ReactSetState<Position | null>) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {

        const coords: GeolocationCoordinates = position.coords;

        setPosition({ latitude: coords.latitude, longitude: coords.longitude })
        map.setCenter([coords.longitude, coords.latitude]);

      }, error => {
        console.log('position error', error);
        setPosition(null)
      })
    }
  }

export { getPosition }