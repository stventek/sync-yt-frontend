import { Box, Button, Container, Grid, Typography } from "@material-ui/core"
import useStyles from './styles'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import StatsCard from "../../components/stats-card/StatsCard"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2'
import { getTimeString } from "../../utilities/date-helpers"
import NavBar from "../../components/navbar/navbar"
import {KeyboardDatePicker} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import DashboardFilters from "./DashboardFilters"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

const initResState = {
    activeRooms: 0,
    activeUsers: 0,
    totalCreated: 0,
    totalJoin: 0,
    welcomeMessage: '',
    graph: {
        labels: [] as Array<string>,
        datasets: [] as Array<{label: string, data: Array<string>, [key: string] : any}>
    }
}

var fromDate = new Date()
var toDate = new Date()

fromDate.setDate(1);
fromDate.setMonth(fromDate.getMonth()-1);

toDate.setDate(30);
toDate.setMonth(toDate.getMonth());

const initState = {
    fromDate: fromDate.toISOString(),
    toDate: toDate.toISOString(),
    groupBy: 'day'
}

type resType = typeof initResState;

export default function Dashboard(){

    const classes = useStyles()
    const history = useHistory();

    const [state, setState] = useState(initState)
    const [res, setRes] = useState(initResState)

    const updateDashboard = () => {
        const params = {
            fromDate: state.fromDate,
            toDate: state.toDate,
            groupBy: state.groupBy
        }
        axios.get<resType>('http://localhost:5000/admin/dashboard', {params})
            .then((e) => {
                e.data.graph.labels = e.data.graph.labels.map(e => getTimeString(e))
                e.data.graph.datasets[0].borderColor = 'rgb(255, 99, 132)'
                e.data.graph.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.5)'
                e.data.graph.datasets[1].borderColor = 'rgb(53, 162, 235)'
                e.data.graph.datasets[1].backgroundColor = 'rgba(53, 162, 235, 0.5)'
                setRes({...res, ...e.data})
            }).catch(e => {
                if(e.response.status === 401) history.push('/admin/signin')
            })
    }

    useEffect(()=> {
        updateDashboard()
    }, [])

    const handleDateChange = (event: MaterialUiPickersDate, name: string) => {
        if(event)
            setState({
                ...state,
                [name]: event.toISOString()
            });
    };

    const handleDashboarUpdate = ((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateDashboard()
    })

    
    const handleChange = (event: ChangeEvent<{name?: string | undefined, value: unknown}>) => {
        if(event.target.name)
            setState({
                ...state,
                [event.target.name]: event.target.value
            });
      };

    return <div>
        <NavBar withChangeVideoInput={false} logOut={true}/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Box maxWidth={850} overflow='clip' mr={3} ml={3}>
                <Box mt={3}>
                    <Typography variant="h4">Dashboard</Typography>
                </Box>
                <Box mt={3}>
                    <Typography variant="h5" color="textSecondary">{res.welcomeMessage}</Typography>
                </Box>
                <form onSubmit={handleDashboarUpdate}>
                    <DashboardFilters
                        handleGroupByChange={handleChange}
                        groupBy={state.groupBy} 
                        fromDate={state.fromDate}
                        toDate={state.toDate}
                        handleDateChange={handleDateChange}/>
                </form>
                <Grid container spacing={2} className={classes.root}>
                    <Grid item xs={12}>
                        <Line options={options} data={res.graph}/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <StatsCard value={res.totalCreated} short="created" title="Total Created" bgcolor="rgba(255, 99, 132, 0.7)"></StatsCard>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <StatsCard value={res.totalJoin} short="joined" title="Total Joined" bgcolor="rgba(53, 162, 235,0.7)"></StatsCard>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <StatsCard value={res.activeRooms} short="active" title="Active Rooms"></StatsCard>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <StatsCard value={res.activeUsers} short="active" title="Active Users"></StatsCard>
                    </Grid>
                </Grid>
            </Box>
        </div>
    </div>
}