import { auth } from "../../utils/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Row, Spinner } from "reactstrap";
import { ReactComponent as MainIcon } from "../../assets/main_icon.svg";
import WaveBack from "../../assets/wave-bg.png";
import BannerCycle from "../../assets/banner_cycle.png";
import "./login.scss";
import { authenticateUser } from "./helpers/authCalls";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit();
          console.log("CAPTCHA SOLVED");
        },
      },
      auth
    );
  }, []);

  const sendVerificationCode = () => {
    setLoading(true);
    const phoneNumber = "+911122334455";
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("CODE SENT", confirmationResult);
        setCodeSent(true);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("ERROR: ", error);
        setCodeSent(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const verifyOTP = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log("USER: ", user);
        auth.currentUser.getIdToken(true).then((idToken) => {
          authenticateUser(idToken)
            .then((res) => {
              console.log("RES: ", res);
            })
            .catch((err) => {
              console.log("ERR: ", err);
            })
            .catch((err) => {
              console.log("ERR: ", err);
            });
        });
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("ERROR: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="loginpage">
      <Row>
        <Col md={6}>
          <div className="hero-section">
            <h1 className="page-title">
              CYCL <MainIcon />
            </h1>
            <p className="page-sub-title">When in doubt, pedal it out!</p>
            <img src={BannerCycle} alt="banner_cycle" />
          </div>
        </Col>
        <Col md={6}>
          <Form className="login-form">
            <h2 className="login-title">
              <span className="text-purple">Easy</span> Login
            </h2>
            <FormGroup>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                className="login-input"
                disabled={codeSent}
              />
            </FormGroup>
            <FormGroup>
              <Input
                value={code}
                disabled={!codeSent}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter OTP"
                className="login-input"
              />
              {!codeSent ? (
                <Button className="login-btn" onClick={sendVerificationCode}>
                  <span>{loading ? <Spinner color="light" /> : "Verify"}</span>
                </Button>
              ) : (
                <Button className="login-btn" onClick={verifyOTP}>
                  <span>{loading ? <Spinner color="light" /> : "Login"}</span>
                </Button>
              )}
            </FormGroup>
            <center>
              <div id="recaptcha-container"></div>
            </center>
          </Form>
        </Col>

        {/* <WaveBG /> */}
      </Row>
      <img src={WaveBack} alt="wave-bg" className="wave-bg" />
    </div>
  );
};

export default Login;
