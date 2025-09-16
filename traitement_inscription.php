<?php
// traitement_inscription.php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sécuriser les données reçues
    $nom = htmlspecialchars(trim($_POST["nom"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $telephone = htmlspecialchars(trim($_POST["telephone"]));
    $typeFormation = htmlspecialchars(trim($_POST["typeFormation"]));
    $pole = htmlspecialchars(trim($_POST["pole"]));
    $programme = htmlspecialchars(trim($_POST["programme"]));

    // Adresse de l'administration (changer par votre adresse)
    $adminEmail = "noubizakaria5@gmail.com";

    // Sujet et message pour l'étudiant
    $sujetEtudiant = "Confirmation d'inscription - Easy Bridge Academy";
    $messageEtudiant = "
    Bonjour $nom,

    Nous avons bien reçu votre demande d'inscription à Easy Bridge International Academy.
    
    📌 Détails de votre inscription :
    - Type de formation : $typeFormation
    - Pôle : $pole
    - Programme : $programme
    - Téléphone : $telephone

    Notre équipe vous contactera très prochainement pour finaliser votre dossier.

    Merci pour votre confiance !
    Easy Bridge International Academy
    ";

    // Sujet et message pour l'administration
    $sujetAdmin = "Nouvelle inscription - $nom";
    $messageAdmin = "
    Nouvelle demande d'inscription reçue :

    Nom : $nom
    Email : $email
    Téléphone : $telephone
    Type de formation : $typeFormation
    Pôle : $pole
    Programme : $programme
    ";

    // En-têtes email
    $headers = "From: Easy Bridge Academy <no-reply@easybridge.academy>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoi des mails
    $mailEtudiant = mail($email, $sujetEtudiant, $messageEtudiant, $headers);
    $mailAdmin = mail($adminEmail, $sujetAdmin, $messageAdmin, $headers);

    if ($mailEtudiant && $mailAdmin) {
        echo "<script>alert('Votre inscription a été envoyée avec succès !'); window.location.href='inscription.html';</script>";
    } else {
        echo "<script>alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.'); window.history.back();</script>";
    }
} else {
    // Si quelqu'un accède directement au fichier
    header("Location: inscription.html");
    exit();
}
?>
