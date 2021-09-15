import { useDispatch } from "react-redux";
import { routes } from "../../Config/routes";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import './Dashboard.css'
import { getUsersInfo } from "../../apis/api"
import { onLogout } from "../../Services/action";
const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [response, setResponse] = useState([])
  const [val, setval] = useState(7)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsersInfo()
      setResponse((prev) => [...prev, ...response])
    }
    if (val <= 7) {
      for (let i = 0; i <= val; i++) {
        setTimeout(() => { fetchData(); }, 100 * i)
      }
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);
  const handleLogout = () => {
    try {
      dispatch(onLogout())
      history.push(routes.login.path);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleScroll = (e) => {
    console.log(e.target.scrollHeight)
    if (e.target.scrollHeight - e.target.scrollTop !== e.target.clientHeight) {
      return;
    } else {
      console.log("HEre")
      setTimeout(() => { setval(val + 1) }, 1000)
    };

  }
  return (
    <div className="maindashboard">
      <div className='dashboard-header'><span className='dashboard-title' onClick={() => { setval(val + 1) }} >Home</span>
        <button className='logout-button' onClick={handleLogout}>Logout</button></div>
      <div className={response.length ? 'dashboard' : "placeholder-item"} onScroll={(e) => handleScroll(e)}>
        <ul className="mainlist">
          {
            response.map((data) => {
              return <li className="listDes" key={data?.id?.value}>
                <p className="name">{data?.name?.title} {data?.name?.first} {data?.name?.last}</p>
                <img className="image" src={data?.picture?.large} alt="NA" />
              </li>
            })
          }
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;
