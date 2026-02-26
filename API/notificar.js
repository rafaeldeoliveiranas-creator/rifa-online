import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Só aceita requisições POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  // Recebe os dados do site
  const { nome, telefone, numero } = JSON.parse(req.body);

  try {
    // Configuração do Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rafaeldeoliveiranas@gmail.com",  // remetente
        pass: "jtegwpnhnltieswq"               // senha de app
      }
    });

    // Envia o e-mail
    await transporter.sendMail({
      from: "rafaeldeoliveiranas@gmail.com",
      to: "ritam7937@gmail.com, rafaeldeoliveiranas@gmail.com",
      subject: "Novo participante na rifa!",
      text: `Nome: ${nome}\nNúmero: ${numero}\nTelefone: ${telefone}`
    });

    return res.status(200).json({ message: "E-mail enviado com sucesso!" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
}
