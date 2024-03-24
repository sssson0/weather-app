
import { useEffect,useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

function App() {

  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState("")
  const [loading,setLoading] = useState(false)
  const cities =["Paris","new york",'seoul']

  const getCurrentLocation =()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon)
    });
  };
  
  const getWeatherByCurrentLocation = async(lat,lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6e3a66dfd9ed8867edcb4ca5079a2ef5&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data)
    setLoading(false)
  }

  const getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e3a66dfd9ed8867edcb4ca5079a2ef5&units=metric`;
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data)
    setLoading(false)
  }

  useEffect(()=>{
    if(city==""){
      getCurrentLocation()
    }else{
      getWeatherByCity()
    }
  },[city])

 

  return (
    <div>
      {loading?(<div className='container'><ClipLoader color="#f86c6b" size={150} loading={loading}/></div>)
      :(<div className='container'>
      <WeatherBox weather={weather}/>
      <WeatherButton cities ={cities} setCity={setCity} />
      </div>)}
      
    </div>
  );
}

export default App;
