import './Login.css';

function Login(){
    return(
        <div className="container">
            <h1>Login Page</h1>
            <form>
                <div>
                    <input type="text" placeholder="Username" />
                </div>
                <div>
                    <input type="password" placeholder="Password" />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>  
                <span>Don't have an account? <a href="/signup.jsx">Sign Up</a></span>
            </form>
        </div>
    )
}
export default Login;