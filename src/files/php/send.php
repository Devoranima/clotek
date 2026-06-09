<?php

use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';


if (isset($_POST['g-recaptcha-response']) && $_POST['g-recaptcha-response']) {
	$secret = '{{RECAPTCHA_SECRET_KEY}}';
	$ip = $_SERVER['REMOTE_ADDR'];
	$response = $_POST['g-recaptcha-response'];
	$rsp = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response&remoteip=$ip");
	$arr = json_decode($rsp, TRUE);
	if ($arr['success']) {

    //Mail format

    $name = $_POST['name'];
    $phone = $_POST['num'];
    $email = $_POST['email'];
    $text = $_POST['message'];

    $title = "Новая заявка с Clotek.ru";
    $body = "
    <h2>Заявка</h2>
    <b>Имя: </b> $name <br>
    <b>Адрес почты: </b> $email <br>
    <b>Номер телефона: </b> $phone <br>
    <b>Сообщение:</b><br>$text";

    $mail = new PHPMailer();
    try {
      $mail->isSMTP();
      $mail->CharSet = "UTF-8";
      $mail->SMTPAuth = true;
      $mail->Debugoutput = function ($str, $level){$GLOBALS['status'][]=$str;};
      $mail->SMTPDebug = 2;


      //Mail settings
      $mail->Host = 'smtp.yandex.ru';
      $mail->Username = 'clotek.mailer';
      $mail->Password = 'striagnqgpnzcgpa';
      $mail->SMTPSecure = 'ssl';
      $mail->Port = 465;
      // $mail->setFrom('noreply@clotek.ru', 'Администратор clotek.ru');
      $mail->setFrom('clotek.mailer@yandex.ru', 'Администратор clotek.ru');
      
      
      //Email recipient
      //$mail->addAddress('clotek_mailer@mail.ru');
      $mail->addAddress('clotek@mail.ru');
      // $mail->addAddress('zuk0.tin@mail.ru');

      //Email sending

      $mail->isHTML(true);
      $mail->Subject = $title;
      $mail->Body = $body;


      if($mail->send()) {$result = 'success';}
      else {$result = "error"; $status = $mail->ErrorInfo;}
    }catch(Exception $e){
      $result = "error";
      $status = "Сообщение не было доставлено. Ошибка: {$mail->ErrorInfo}";
    }

    echo json_encode(["result" => $result, "status" => $status]);
	}
}