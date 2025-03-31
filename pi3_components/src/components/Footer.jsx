import React from 'react';
import InstagramIcon from "../assets/svg/instagram.svg";
import FacebookIcon from "../assets/svg/facebook.svg";
import YoutubeIcon from "../assets/svg/youtube.svg";
import LocationIcon from "../assets/svg/casa.svg";
import PhoneIcon from "../assets/svg/telefone.svg";
import EmailIcon from "../assets/svg/email.svg";

const Footer = ({ contactInfo, socialLinks }) => {
    return (
        <footer className="footer-bgcolor text-light p-4">
            <div className="container d-flex justify-content-left footer-gap">
                <div>
                    <h5>Contactos</h5>
                    <p>
                        <img src={LocationIcon} width="20" height="20" style={{ marginRight: '8px' }} /> 
                        {contactInfo.address}
                    </p>
                    <p>
                        <img src={PhoneIcon} width="20" height="20" style={{ marginRight: '8px' }} /> 
                        {contactInfo.phone}
                    </p>
                    <p>
                        <img src={EmailIcon} width="20" height="20" style={{ marginRight: '8px' }} /> 
                        {contactInfo.email}
                    </p>
                </div>
                <div>
                    <h5>Redes Sociais</h5>
                    <p>
                        <img src={InstagramIcon} width="20" height="20" style={{ marginRight: '8px' }} />
                        <a href={socialLinks.instagram} className="text-light">Instagram</a>
                    </p>
                    <p>
                        <img src={FacebookIcon} width="20" height="20" style={{ marginRight: '8px' }} />
                        <a href={socialLinks.facebook} className="text-light">Facebook</a>
                    </p>
                    <p>
                        <img src={YoutubeIcon} width="20" height="20" style={{ marginRight: '8px' }} />
                        <a href={socialLinks.youtube} className="text-light">Youtube</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
