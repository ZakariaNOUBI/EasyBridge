<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Infos du formulaire
    $name = htmlspecialchars($_POST["cand_name"]);
    $email = htmlspecialchars($_POST["cand_email"]);
    $phone = htmlspecialchars($_POST["cand_phone"]);
    $message = htmlspecialchars($_POST["cand_message"]);

    // Email destinataire
    $to = "noubizakaria5@gmail.com"; // <-- change par ton email
    $subject = "Nouvelle candidature - $name";

    // Corps du mail (texte)
    $body = "Nom : $name\n";
    $body .= "Email : $email\n";
    $body .= "Téléphone : $phone\n\n";
    $body .= "Message :\n$message\n\n";

    // Gestion du fichier joint
    if (isset($_FILES["cand_cv"]) && $_FILES["cand_cv"]["error"] == 0) {
        $file_tmp = $_FILES["cand_cv"]["tmp_name"];
        $file_name = $_FILES["cand_cv"]["name"];
        $file_size = $_FILES["cand_cv"]["size"];
        $file_type = $_FILES["cand_cv"]["type"];
        $file_content = chunk_split(base64_encode(file_get_contents($file_tmp)));

        // Boundary (séparation texte / pièce jointe)
        $boundary = md5(time());

        // Headers email
        $headers = "From: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Message avec pièce jointe
        $message_body  = "--$boundary\r\n";
        $message_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $message_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $message_body .= $body . "\r\n";
        $message_body .= "--$boundary\r\n";
        $message_body .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
        $message_body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
        $message_body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $message_body .= $file_content . "\r\n";
        $message_body .= "--$boundary--";

        // Envoi de l’email
        if (mail($to, $subject, $message_body, $headers)) {
            echo "✅ Votre candidature a été envoyée avec succès. Merci !";
        } else {
            echo "❌ Une erreur est survenue lors de l’envoi de votre candidature.";
        }
    } else {
        echo "⚠️ Aucun fichier CV n’a été joint ou une erreur est survenue.";
    }
}
?>
