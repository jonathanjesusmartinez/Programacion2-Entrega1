const express = require('express');
const router = express.Router();

const pool = require('../database');
const { database } = require('../keys');
const { isLoggedIn } = require('../lib/auth');

router.get('/agrRecipiente', isLoggedIn, (req, res) => {
    res.render('rec/agrRecipiente');
});

router.post('/agrRecipiente', isLoggedIn, async (req, res) => {
    const { numero, tipo, capacidad, estado, contenido, sector } = req.body;
    const newRecipiente = {
        numero,
        tipo,
        capacidad,
        estado,
        contenido,
        sector

    };
    try {
        if ((newRecipiente.numero.length) > 0) {
            await pool.query('INSERT INTO recipiente set ?', [newRecipiente]);
            res.redirect('/rec');
        }    
    } catch (error) {
        req.flash('message', 'Error al guardar recipiente');
        res.redirect('/rec/agrRecipiente');
    }  
});

router.get('/', isLoggedIn, async (req, res) => {
    const recipientes = await pool.query('SELECT * FROM recipiente ORDER BY numero');
    res.render('rec/list', {recipientes});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM recipiente WHERE ID = ?', [id]);
    res.redirect('/rec');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const recipientes = await pool.query('SELECT * FROM recipiente WHERE ID = ?', [id]);
    res.render('rec/edit', {recipiente: recipientes[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { numero, tipo, capacidad, estado, contenido, sector } = req.body;
    const newRecipiente = {
        numero,
        tipo,
        capacidad,
        estado,
        contenido,
        sector
    };
    try {
        if ((newRecipiente.numero.length) > 0) {
            await pool.query('UPDATE recipiente set ? WHERE id = ?', [newRecipiente, id]);
            res.redirect('/rec');
        }    
    } catch (error) {
        req.flash('message', 'Error al guardar recipiente');
        res.redirect('/rec');
    }  

});

router.get('/bomba', isLoggedIn, async (req, res) => {
    const bombas = await pool.query('SELECT * FROM bomba ORDER BY denominacion');
    res.render('rec/bomba', {bombas});
});

router.get('/agrBomba', isLoggedIn, (req, res) => {
    res.render('rec/agrBomba');
});

router.post('/agrBomba', isLoggedIn, async (req, res) => {
    const { num_serie, litrosHora, denominacion, tipo_bomba } = req.body;
    const newBomba = {
        num_serie,
        litrosHora,
        denominacion,
        tipo_bomba

    };
    try {
        if ((newBomba.num_serie.length) > 0) {
            await pool.query('INSERT INTO bomba set ?', [newBomba]);
            res.redirect('/rec/bomba');
        }    
    } catch (error) {
        req.flash('message', 'Error al guardar bomba');
        res.redirect('/rec/agrBomba');
    }  
    console.info(newBomba);
});

router.get('/editB/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const bombas = await pool.query('SELECT * FROM bomba WHERE ID = ?', [id]);
    res.render('rec/editB', {bomba: bombas[0]});
});

router.post('/editB/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { num_serie, litrosHora, denominacion, tipo_bomba } = req.body;
    const newBomba = {
        num_serie,
        litrosHora,
        denominacion,
        tipo_bomba
    };
    try {
        if ((newBomba.num_serie.length) > 0) {
            await pool.query('UPDATE bomba set ? WHERE num_serie = ?', [newBomba, id]);
            res.redirect('/rec/bomba');
        }    
    } catch (error) {
        req.flash('message', 'Error al guardar bomba');
        res.redirect('/rec/bomba');
    }  
    
});

router.get('/deleteB/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM bomba WHERE ID = ?', [id]);
    res.redirect('/rec/bomba');
});

router.get('/insumEnologico', isLoggedIn, async (req, res) => {
    const insumos = await pool.query('SELECT * FROM bomba ORDER BY denominacion');
    res.render('rec/insumEnologico', {insumos});
});


router.get('/personal', isLoggedIn, async (req, res) => {
    const personas = await pool.query('SELECT * FROM bomba ORDER BY denominacion');
    res.render('rec/personal', {personas});
});
module.exports = router;