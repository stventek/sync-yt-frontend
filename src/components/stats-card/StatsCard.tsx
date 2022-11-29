import Card from '@material-ui/core/Card'
import { Box, Typography } from "@material-ui/core"
import CardContent from '@material-ui/core/CardContent';

export default function StatsCard(props: {title: string, value: number, short: string, bgcolor?: string}){
    return <Card style={{height: 200, background: props.bgcolor, borderRadius: 0}}>
            <CardContent>
                <Typography variant="h6">
                    {props.title}
                </Typography>
                <Box mt={5}>
                    <Typography variant="h4" align="center" component="h2">
                        {props.value}
                    </Typography>
                </Box>
                <Typography color="textSecondary" align="center">
                    {props.short}
                </Typography>
            </CardContent>
        </Card>
}