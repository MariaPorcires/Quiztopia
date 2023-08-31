import { Position } from "./interfaces";

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>


function getPosition(setPosition: ReactSetState<Position | null>) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {

        const coords: GeolocationCoordinates = position.coords;

        setPosition({ latitude: coords.latitude, longitude: coords.longitude })
        console.log(coords);
        console.log(position);

      }, error => {
        console.log('position error', error);
        setPosition(null)
      })
    }
  }

export { getPosition }