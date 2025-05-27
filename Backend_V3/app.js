const express = require('express');
const app = express();
const cors=require('cors'); 

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors({
  origin: '*', 
})); 


app.use("/utilizadores", require('./src/routes/utilizadoresRoutes'));
app.use("/utilizadores_tipos", require('./src/routes/utilizadores_tiposRoutes'));
app.use("/propostas_tipos", require('./src/routes/propostas_tiposRoutes'));
app.use("/propostastipos_propostas", require('./src/routes/propostastipos_propostasRoutes'));
app.use("/propostas", require('./src/routes/propostasRoutes'));
app.use("/competencias", require('./src/routes/competenciasRoutes'));
app.use("/propostas_competencias", require('./src/routes/propostas_competenciasRoutes'));
app.use("/notificacoes", require('./src/routes/notificacoesRoutes'));
app.use("/estudantes", require('./src/routes/estudantesRoutes'));
app.use("/estudantes_competencias", require('./src/routes/estudantes_competenciasRoutes'));
app.use("/estudantes_notificacoes", require('./src/routes/estudantes_notificacoesRoutes'));
app.use("/noticias", require('./src/routes/noticiasRoutes'));
app.use("/gestores", require('./src/routes/gestoresRoutes'));
app.use("/empresas", require('./src/routes/empresasRoutes'));
app.use("/departamentos", require('./src/routes/departamentosRoutes'));



app.listen(app.get('port'), () => {
  console.log(`Porto: ${app.get('port')}`);
} );
