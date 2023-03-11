<?php

//Mailer 

use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';


//Mail format

$name = $_POST['name'];
$phone = $_POST['num'];
$text = $_POST['message'];

$title = "Новая заявка с Clotek.ru";
$body = "
<h2>Заявка</h2>
<b>Имя: </b> $name <br>
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
  $mail->Username = 'Clotek116';
  $mail->Password = '32309191';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->setFrom('noreply@clotek.ru', 'Администратор clotek.ru');
  
  
  //Email recipient
  $mail->addAddress('clotek_mailer@mail.ru');

  //Email sending

  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;


  if($mail->send()) {$result = 'success';}
  else {$result = "error";}
}catch(Exception $e){
  $result = "error";
  $status = "Сообщение не было доставлено. Ошибка: {$mail->ErrorInfo}";
}

echo json_encode(["result" => $result, "status" => $status]);