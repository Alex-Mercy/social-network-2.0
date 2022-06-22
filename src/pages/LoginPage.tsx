import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from "yup";
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { LoginFormRequestType } from '../store/types';
import { FormTextField } from '../components/FormTextField';
import { authApi } from '../store/api/api';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

const validationSchema = yup.object().shape({
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
  
});

export default function LoginPage() {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const navigate = useNavigate();
  const [login, {data, status}] = authApi.useLoginMutation();

  const handleLogin = async (values: LoginFormRequestType) => {
     await login(values).unwrap();
  }

  if (data?.resultCode === 0) {
    navigate('/profile');
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          email: "",
          password: "",
          remember: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: LoginFormRequestType,
          formikHelpers: FormikHelpers<LoginFormRequestType>
        ) => {
          handleLogin(values);
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<LoginFormRequestType>) => (
          <Form noValidate autoComplete="off">
            <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box >
            <Field
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              component={FormTextField}
            />
            <Field
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              component={FormTextField}
            />
            <FormControlLabel
              control={<Checkbox value="remember" name='remeber' color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              disabled={formikProps.isSubmitting}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
          </Form>
        )}
      </Formik>


        
        
        
      </Container>
    </ThemeProvider>
  );
}