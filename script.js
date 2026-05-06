'use strict';

const form = document.getElementById('formContato');
const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const erroNome = document.getElementById('erro-nome');
const erroEmail = document.getElementById('erro-email');
const msgSucesso = document.getElementById('mensagem-sucesso');

const validarNome = () => {
  const valor = campoNome.value.trim();
  const palavras = valor.split(/\s+/).filter(Boolean);

  if (valor === '') {
    return { valido: false, mensagem: 'O nome completo é obrigatório.' };
  }
  if (valor.length < 6) {
    return { valido: false, mensagem: 'O nome deve ter pelo menos 6 caracteres.' };
  }
  if (palavras.length < 2) {
    return { valido: false, mensagem: 'Informe nome e sobrenome.' };
  }
  return { valido: true, mensagem: '' };
};

const validarEmail = () => {
  const valor = campoEmail.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valor === '') {
    return { valido: false, mensagem: 'O e-mail é obrigatório.' };
  }
  if (!regexEmail.test(valor)) {
    return { valido: false, mensagem: 'Informe um e-mail válido (ex.: nome@dominio.com).' };
  }
  return { valido: true, mensagem: '' };
};

const atualizarFeedback = (campo, elementoErro, resultado) => {
  if (resultado.valido) {
    campo.classList.add('valido');
    campo.classList.remove('invalido');
    elementoErro.textContent = '';
  } else {
    campo.classList.add('invalido');
    campo.classList.remove('valido');
    elementoErro.textContent = resultado.mensagem;
  }

  msgSucesso.classList.remove('visivel');
  msgSucesso.textContent = '';
};

const validarCampoNome = () => {
  const resultado = validarNome();
  atualizarFeedback(campoNome, erroNome, resultado);
  return resultado.valido;
};

const validarCampoEmail = () => {
  const resultado = validarEmail();
  atualizarFeedback(campoEmail, erroEmail, resultado);
  return resultado.valido;
};

const validarFormulario = () => {
  const nomeValido = validarCampoNome();
  const emailValido = validarCampoEmail();
  return nomeValido && emailValido;
};

const limparFormulario = () => {
  campoNome.value = '';
  campoEmail.value = '';
  campoNome.classList.remove('valido', 'invalido');
  campoEmail.classList.remove('valido', 'invalido');
  erroNome.textContent = '';
  erroEmail.textContent = '';
};

campoNome.addEventListener('blur', validarCampoNome);
campoEmail.addEventListener('blur', validarCampoEmail);

campoNome.addEventListener('input', () => {
  if (campoNome.classList.contains('invalido')) {
    validarCampoNome();
  }
});

campoEmail.addEventListener('input', () => {
  if (campoEmail.classList.contains('invalido')) {
    validarCampoEmail();
  }
});

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const formValido = validarFormulario();

  if (formValido) {
    msgSucesso.textContent = ' Formulário enviado com sucesso! Entraremos em contato em breve.';
    msgSucesso.classList.add('visivel');

    console.log('Dados válidos:', {
      nome: campoNome.value.trim(),
      email: campoEmail.value.trim(),
    });

    setTimeout(() => {
      limparFormulario();
    }, 2500);
  } else {

    if (!validarNome().valido) {
      campoNome.focus();
    } else if (!validarEmail().valido) {
      campoEmail.focus();
    }
  }
});