
import './footer.css';
import Logo from '../assets/Logo2.png'

function Footer() {
    return (
        <footer>
            <div id="footer_content">
                <div id="footer_contacts">
                    <img src={Logo} className="logo" alt="logo" />

                    <div id="footer_social_media">
                        <a href="https://www.linkedin.com/in/joao-vitor-furquim-5725a3221/" className="footer-link" id="linkedin" target='_blank'>
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>

                        <a href="https://github.com/JoaoVFB" className="footer-link" id="github" target='_blank'>
                            <i className="fa-brands fa-github"></i>
                        </a>

                    </div>
                </div>

                <h3>Dados fornecidos por TMDB API | © 2025 João Furquim</h3>


            </div>
        </footer>
    )
}

export default Footer;