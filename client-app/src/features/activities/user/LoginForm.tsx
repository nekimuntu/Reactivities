import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../../common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";

 function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: "", password: "",error:null }}
            onSubmit={(values,{setErrors}) => 
                (userStore.login(values)).catch((error)=>setErrors({error:"Invalid username or password"}))           
                
            }
        >
            {({ handleSubmit, isSubmitting,errors }) => {
                return (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off">
                        <Header as="h2" content="Login to Reactivities" color="teal" textAling="center" />
                        <MyTextInput placeholder="email" name="email" />
                        <MyTextInput placeholder="Password" name="password" type="password" />
                        <ErrorMessage
                            name="error" render={() => <Label style={{ marginBottom: 10 }} content={errors.error} basic color="red" />} />
                        <Button loading={isSubmitting} positive content="login" type="submit" fluid />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default observer(LoginForm)