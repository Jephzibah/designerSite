<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $shortText = strip_tags(trim($_POST["shortText"]));
    $longText = strip_tags(trim($_POST["longText"]));

    // Check the data
    if (empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($shortText) OR empty($longText)) {
        // Set a 400 (bad request) response code and exit
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

    $recipient = "contact@csralawncare.com"; // SET YOUR EMAIL ADDRESS HERE
    $subject = "New contact from $name";

    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Short Text: $shortText\n";
    $email_content .= "Long Text:\n$longText\n";

    // Email Headers
    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }

} else {
    // Not a POST request, set a 403 forbidden response code
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
