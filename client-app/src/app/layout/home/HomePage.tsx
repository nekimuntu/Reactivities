import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomPage(){
    return(
        <Container style={{marginTop:"7 em"}} >
            <h1>Home Page</h1>
            <h3>go to <Link to='/activities'> Activities </Link> </h3>
        </Container>
    );
}