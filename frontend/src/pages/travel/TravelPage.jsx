import React from 'react'
import GlobalContext from '../../context/GlobalContext';
export default function TravelPage() {
    const {setSelectedKeys} = React.useContext(GlobalContext);

    React.useEffect(() => {
      setSelectedKeys(["2"]);
    }, []);
    
  return (
    <div>TravelPage</div>
  )
}
