import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from "yup";
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { FormTextField } from './FormTextField';
import { useNavigate } from 'react-router-dom';
import { authApi, LoginFormRequestType } from '../../store/api/authApi';


const theme = createTheme();

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup.string().required('Password is required'),
});


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {data: authData} = authApi.useGetIsAuthorizedQuery();
  const {data: captchaData} = authApi.useGetCaptchaQuery();
  const [login, {data}] = authApi.useLoginMutation();

  const handleLogin = async (values: LoginFormRequestType) => {
    await login(values).unwrap();
  }

  if (authData?.id) {
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
            captcha: ''
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
                  <Field
                    as={FormControlLabel}
                    type="checkbox"
                    name='remember'
                    control={<Checkbox />}
                    label="Remember me"
                  />
                  {data?.resultCode === 10 && 
                  <>
                  <Field
                    margin="normal"
                    required
                    fullWidth
                    name="captcha"
                    label="Please enter the text below"
                    id="captcha"
                    component={FormTextField}
                  />
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={captchaData?.url} />
                  </div>
                  </>
                  }
                  
                  <Button
                    type="submit"
                    disabled={!formikProps.isValid || formikProps.isSubmitting}
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

export default LoginPage;