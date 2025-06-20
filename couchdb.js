import Nano from 'nano';

// ✅ URL de connexion
const couchUrl = process.env.COUCHDB_URL || 'http://admin:admin123@localhost:5984';
const couch = Nano(couchUrl);

// ✅ Fonction pour initialiser la base de données boats
async function initBoatsDb() {
  try {
    const boatsDb = couch.db.use('boats');

    // Vérifier si la base existe
    try {
      await boatsDb.info();
      console.log('✅ La base "boats" existe déjà');
    } catch (error) {
      if (error.statusCode === 404) {
        // Créer la base
        await couch.db.create('boats');
        console.log('✅ Base "boats" créée');
      } else {
        throw error;
      }
    }

    return boatsDb;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de CouchDB:', error);
    throw error;
  }
}

// ✅ Exporter une PROMISE au lieu de faire `await` directement
const boatsDbPromise = initBoatsDb();

export { couch, boatsDbPromise };
