import React from 'react';
import InstagramIcon from "../assets/svg/instagram.svg";
import FacebookIcon from "../assets/svg/facebook.svg";
import YoutubeIcon from "../assets/svg/youtube.svg";
import LocationIcon from "../assets/svg/casa.svg";
import PhoneIcon from "../assets/svg/telefone.svg";
import EmailIcon from "../assets/svg/email.svg";

const Footer = ({ contactInfo, socialLinks }) => {
    return (
        <footer className="footer-bgcolor text-light">
            <div className="container">
                <div className="row">
                    <div className="col-6 mb-3">
                        <h5>Contactos</h5>
                        <p>
                            <img src={LocationIcon} width="20" height="20" style={{ marginRight: '8px' }} alt="Localização" />
                            {contactInfo.address}
                        </p>
                        <p>
                            <img src={PhoneIcon} width="20" height="20" style={{ marginRight: '8px' }} alt="Telefone" />
                            {contactInfo.phone}
                        </p>
                        <p>
                            <img src={EmailIcon} width="20" height="20" style={{ marginRight: '8px' }} alt="Email" />
                            {contactInfo.email}
                        </p>
                    </div>
                    <div className="col-6 mb-3">
                        <h5>Redes Sociais</h5>
                        <p>
                            <img src={InstagramIcon} width="20" height="20" style={{ marginRight: '8px' }} alt="Instagram" />
                            <a href={socialLinks.instagram} className="text-light" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </p>
                        <p>
                            <img src={FacebookIcon} width="20" height="20" style={{ marginRight: '8px' }} alt="Facebook" />
                            <a href={socialLinks.facebook} className="text-light" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </p>
                        <p>
                            <img src={YoutubeIcon} width="20" height="20" style={{ marginRight: '8px' }} alt="Youtube" />
                            <a href={socialLinks.youtube} className="text-light" target="_blank" rel="noopener noreferrer">Youtube</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;