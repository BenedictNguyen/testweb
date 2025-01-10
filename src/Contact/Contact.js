import React, { useState } from 'react';
import '../Contact/Contact.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Menu from '../components/Menu/menu';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        facebook: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g. send data to server)
        console.log(formData);
    };

    return (
        <div className="contact-container">
            <div className="contact-body-inner">
                <Header />
                <div className="contact-body">
                    <div className="contact-column contact-info">
                        <h2>Thông Tin Liên Hệ</h2>
                        <ul>
                            <li><strong>Điện thoại:</strong> +123 456 789</li>
                            <li><strong>Email:</strong> example@mail.com</li>
                            <li><strong>Địa chỉ:</strong> 123 Đường ABC, Thành phố XYZ</li>
                        </ul>
                        <div className="contact-social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="contact-icon contact-facebook-icon">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="contact-icon contact-youtube-icon">
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" className="contact-icon contact-whatsapp-icon">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    <div className="contact-column contact-message">
                        <h2>Gửi Lời Nhắn</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="contact-form-group">
                                <label htmlFor="name">Họ Tên</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="contact-form-group">
                                <label htmlFor="phone">Điện thoại</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="contact-form-group">
                                <label htmlFor="facebook">Facebook</label>
                                <input
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="contact-form-group">
                                <label htmlFor="message">Lời nhắn</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="contact-submit-btn">Gửi</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Contact;