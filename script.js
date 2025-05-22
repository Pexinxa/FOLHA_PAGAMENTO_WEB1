document.getElementById('payrollForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('error').textContent = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('result').innerHTML = '';

 
    const nome = document.getElementById('nomeFuncionario').value.trim();
    const cargo = document.getElementById('cargoFuncionario').value;
    const beneficios = Array.from(document.querySelectorAll('input[name="beneficios"]:checked')).map(el => parseFloat(el.value));
    const tipoContrato = document.querySelector('input[name="tipoContrato"]:checked');

    
    if (!nome) {
        document.getElementById('error').textContent = 'Por favor, informe o nome do funcionário.';
        return;
    }
    if (!cargo) {
        document.getElementById('error').textContent = 'Por favor, selecione um cargo.';
        return;
    }
    if (!tipoContrato) {
        document.getElementById('error').textContent = 'Por favor, selecione um tipo de contrato.';
        return;
    }

    const salarios = {
        gerente: 8000,
        analista: 5000,
        assistente: 3000
    };

    const salarioBase = salarios[cargo];

    const totalBeneficios = beneficios.reduce((acc, curr) => acc + curr, 0);

    const descontoPercent = parseFloat(tipoContrato.value) / 100;
    const descontoValor = salarioBase * descontoPercent;

    const salarioLiquido = salarioBase + totalBeneficios - descontoValor;

    const resultadoHTML = `
        <p><strong>Nome do Funcionário:</strong> ${nome}</p>
        <p><strong>Salário Base:</strong> R$ ${salarioBase.toFixed(2)}</p>
        <p><strong>Valor Total dos Benefícios:</strong> R$ ${totalBeneficios.toFixed(2)}</p>
        <p><strong>Valor dos Descontos:</strong> R$ ${descontoValor.toFixed(2)}</p>
        <p><strong>Salário Líquido Final:</strong> R$ ${salarioLiquido.toFixed(2)}</p>
    `;

    document.getElementById('result').innerHTML = resultadoHTML;
    document.getElementById('result').style.display = 'block';
});