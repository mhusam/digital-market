package com.sellonline.platform.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnBean(JavaMailSender.class)
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail-from}")
    private String mailFrom;

    @Value("${app.store-name}")
    private String storeName;

    public void sendOrderConfirmation(String to, String orderRef, String downloadLink) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(mailFrom);
            msg.setTo(to);
            msg.setSubject("[" + storeName + "] Order confirmed — " + orderRef);
            msg.setText("""
                    Thank you for your order!
                    
                    Your order reference: %s
                    
                    %s
                    
                    If you have any questions, reply to this email.
                    
                    — %s
                    """.formatted(orderRef, downloadLink != null ? "Download your files here: " + downloadLink : "Your order is being processed.", storeName));
            mailSender.send(msg);
        } catch (Exception e) {
            log.warn("Failed to send order confirmation email to {}: {}", to, e.getMessage());
        }
    }

    public void sendPasswordReset(String to, String resetUrl) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(mailFrom);
            msg.setTo(to);
            msg.setSubject("[" + storeName + "] Reset your password");
            msg.setText("Click this link to reset your password (valid for 2 hours):\n\n" + resetUrl + "\n\nIf you didn't request this, ignore this email.");
            mailSender.send(msg);
        } catch (Exception e) {
            log.warn("Failed to send password reset email: {}", e.getMessage());
        }
    }
}
