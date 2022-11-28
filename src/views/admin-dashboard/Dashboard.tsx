import { Box, Container, Grid, Typography } from "@material-ui/core"
import useStyles from './styles'
import { useState } from 'react'
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
  import { Line } from 'react-chartjs-2';
import { getTimeString } from "../../utilities/date-helpers"
import NavBar from "../../components/navbar/navbar"

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

const initState = {
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

type steateType = typeof initState;

export default function Dashboard(){

    const classes = useStyles()
    const history = useHistory();

    const [state, setState] = useState(initState)
    //const [errors, setErrors] = useState([] as Array<{message: string, field: string}>)

    useEffect(()=> {
        const params = {
            fromDate:'2022-01-01T00:00:00.000+00',
            toDate:'2023-11-30T00:00:00.000+00',
            groupBy:'month'
        }
        axios.get<steateType>('http://localhost:5000/admin/dashboard', {params})
            .then((e) => {
                e.data.graph.labels = e.data.graph.labels.map(e => getTimeString(e))
                e.data.graph.datasets[0].borderColor = 'rgb(255, 99, 132)'
                e.data.graph.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.5)'
                e.data.graph.datasets[1].borderColor = 'rgb(53, 162, 235)'
                e.data.graph.datasets[1].backgroundColor = 'rgba(53, 162, 235, 0.5)'
                setState(e.data)
            }).catch(e => {
                if(e.response.status === 401) history.push('/admin/signin')
            })
    }, [])

    return <div>
        <NavBar withChangeVideoInput={false} logOut={true}/>
        <Container maxWidth="md">
            <Box mt={3}>
                <Typography variant="h4">Dashboard</Typography>
            </Box>
            <Box mt={3}>
                <Typography variant="h5" color="textSecondary">{state.welcomeMessage}</Typography>
            </Box>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12}>
                    <Line options={options} data={state.graph}/>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsCard value={state.totalCreated} short="created" title="Total Created" bgcolor="rgba(255, 99, 132, 0.7)"></StatsCard>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsCard value={state.totalJoin} short="joined" title="Total Joined" bgcolor="rgba(53, 162, 235,0.7)"></StatsCard>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsCard value={state.activeRooms} short="active" title="Active Rooms"></StatsCard>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsCard value={state.activeUsers} short="active" title="Active Users"></StatsCard>
                </Grid>
            </Grid>
        </Container>
    </div>
}