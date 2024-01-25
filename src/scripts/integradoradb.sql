-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: integradoradb
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actualizacion_animal`
--

DROP TABLE IF EXISTS `actualizacion_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actualizacion_animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado_salud` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `calificacion` int DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  `fundacion_id` int DEFAULT NULL,
  `visible` tinyint(1) DEFAULT '1',
  `galeria` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_actualizacion_animal_id_idx` (`animal_id`),
  KEY `fk_actualizacion_fundacion_id_idx` (`fundacion_id`),
  CONSTRAINT `fk_actualizacion_animal_id` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`),
  CONSTRAINT `fk_actualizacion_fundacion_id` FOREIGN KEY (`fundacion_id`) REFERENCES `fundacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actualizacion_animal`
--

LOCK TABLES `actualizacion_animal` WRITE;
/*!40000 ALTER TABLE `actualizacion_animal` DISABLE KEYS */;
INSERT INTO `actualizacion_animal` VALUES (21,'2024-01-05','Desparasitante','mejorando',NULL,NULL,'2024-01-05','2024-01-05',73,65,1,'{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240105_180710_755perroLike.jpg\"]}'),(22,'2024-01-05','comida','saludable',NULL,NULL,'2024-01-05','2024-01-05',73,65,1,NULL),(23,'2024-01-08','baño','mejorando',NULL,NULL,'2024-01-08','2024-01-08',90,65,1,NULL),(24,'2024-01-08','ibaño','mejorando',NULL,NULL,'2024-01-08','2024-01-08',93,65,1,NULL),(25,'2024-01-08','medincina','bien',NULL,NULL,'2024-01-08','2024-01-08',93,65,1,'{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240108_103223_695perroPrueba.jpg\"]}'),(26,'2024-01-11','tranformacion','en galgo corredor',NULL,NULL,'2024-01-11','2024-01-11',93,65,1,'{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240110_192559_556perroGalgo.jpg\", \"https://leopetimg.s3.amazonaws.com/20240110_192636_8galgo_espanol-799087477.jpg\"]}'),(27,'2024-01-11','enfermo','deplorable',NULL,NULL,'2024-01-11','2024-01-11',93,65,1,'{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240110_220925_937perroGalgo.jpg\"]}');
/*!40000 ALTER TABLE `actualizacion_animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actualizacion_galeria`
--

DROP TABLE IF EXISTS `actualizacion_galeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actualizacion_galeria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(200) DEFAULT NULL,
  `actualizacion_id` int DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_act_galeria_act_id_idx` (`actualizacion_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_act_galeria_act_id_idx` FOREIGN KEY (`actualizacion_id`) REFERENCES `actualizacion_animal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actualizacion_galeria`
--

LOCK TABLES `actualizacion_galeria` WRITE;
/*!40000 ALTER TABLE `actualizacion_galeria` DISABLE KEYS */;
/*!40000 ALTER TABLE `actualizacion_galeria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrador_fundacion`
--

DROP TABLE IF EXISTS `administrador_fundacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador_fundacion` (
  `id` int NOT NULL,
  `fundacion_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fundacion_id` (`fundacion_id`),
  CONSTRAINT `administrador_fundacion_ibfk_1` FOREIGN KEY (`fundacion_id`) REFERENCES `fundacion` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador_fundacion`
--

LOCK TABLES `administrador_fundacion` WRITE;
/*!40000 ALTER TABLE `administrador_fundacion` DISABLE KEYS */;
INSERT INTO `administrador_fundacion` VALUES (3,1,'2022-03-02 19:42:17','2022-03-02 19:42:17'),(4,2,'2022-03-16 06:25:51','2022-03-16 06:25:51'),(5,3,'2022-03-16 06:34:00','2022-03-16 06:34:00'),(35,65,'2023-11-16 16:10:40','2023-11-16 16:10:40');
/*!40000 ALTER TABLE `administrador_fundacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `especie` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `raza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `galeria` json DEFAULT NULL,
  `fundacion_id` int NOT NULL,
  `visible` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `peso` decimal(10,0) DEFAULT NULL,
  `esterilizacion` tinyint DEFAULT NULL,
  `vacunacion` tinyint DEFAULT NULL,
  `desparasitacion` tinyint DEFAULT NULL,
  `enfermedades` varchar(45) DEFAULT NULL,
  `fecha_rescate` date DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `sexo` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fundacion_id` (`fundacion_id`),
  CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`fundacion_id`) REFERENCES `fundacion` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` VALUES (1,'Balto','NO_APADRINADO','Perro','Husky','Fue encontrado en condiciones deplorables, estaba deshidratado y con parásitos','https://www.pregonagropecuario.com/assets/images/upload/perro_Huky_Siberiano.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_025417_583Balto.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_025422_888Balto2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_025428_149Balto3.jpg\"]}',1,1,'2022-03-02 19:43:48','2022-08-24 02:54:30',2,23,1,1,1,'Ninguna','2022-01-05','2022-01-10',1),(2,'Pepe','NO_APADRINADO','Perro','Mestizo','Fue abandonado por su antigua familia, vagaba por las calles estaba lleno de parasitos','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCr2tLFj5lGk_3MwhsXpMlzUsGr12iDLkCyA&usqp=CAU','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_025558_283Pepe.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_02566_493Pepe2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_025615_628Pepe3.jpg\"]}',1,1,'2022-03-02 19:44:35','2022-08-24 02:56:18',5,20,0,1,1,'Ninguna','2022-01-05','2022-01-10',1),(3,'Pancho','NO_APADRINADO','Gato','Mestizo','Fue encontrado en condiciones deplorables, estaba deshidratado y con parásitos','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6MXVMYMKVyf5m_GjYC3rsQBVAour5kAjmw&usqp=CAU','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_030235_215Pancho.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_030345_389Pancho2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_030354_422Pancho3.jpg\"]}',1,1,'2022-03-02 19:45:08','2022-08-24 03:03:58',7,4,1,1,1,'Ninguna','2022-01-05','2022-01-10',1),(4,'Kiki','NO_APADRINADO','Gato','Mestizo','Estaba amarrada en el portal de una casa soportando la inclemencias del tiempo, lluvia y sol','https://www.fundacion-affinity.org/sites/default/files/el-gato-necesita-tener-acceso-al-exterior.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_031130_556Kiki.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_031138_330Kiki2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_03122_931Kiki3.jpg\"]}',1,1,'2022-03-02 19:45:42','2022-08-24 03:12:06',5,4,1,1,1,'Ninguna','2022-01-05','2022-01-10',0),(6,'Laker','NO_APADRINADO','Perro','Mestizo','Fue abandonado por su antigua familia, vagaba por las calles estaba lleno de parasitos','https://www.eluniverso.com/resizer/y4Scc_nzI4QX7pgXMIhZpiIGBkg=/1190x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/YKYSZKHYV5FOFJCC3ZFY42ABYE.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_004047_60Laker.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_004055_299Laker2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_00413_839Laker3.jpg\"]}',3,1,'2022-03-17 19:44:33','2022-08-24 06:41:34',5,21,0,1,0,'Ninguna','2022-01-05','2022-01-10',1),(7,'Betina','NO_APADRINADO','Perro','Pomeranea','Estaba amarrada en el portal de una casa soportando la inclemencias del tiempo, lluvia y sol','https://www.petdarling.com/wp-content/uploads/2020/11/razas-de-perros.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_002311_894Betina.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_002619_198Betina2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_002624_234Betina3.jpg\"]}',3,1,'2022-03-17 19:45:35','2022-08-24 03:44:17',10,7,1,1,1,'Otitis','2022-01-05','2022-01-10',0),(8,'Morita','NO_APADRINADO','Perro','Bulldog','Estaba siendo utilizada como una perra de crias ','https://okdiario.com/img/2022/01/18/english-bulldog-5422018_1920-1-2-655x368.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_015912_15Morita.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_015925_44Morita2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_020553_373Morita3.jpg\"]}',3,1,'2022-03-17 19:58:20','2022-08-24 02:05:56',8,20,1,1,1,'Gastritis','2022-01-05','2022-01-10',0),(10,'Roco','NO_APADRINADO','Gato','Mestizo','Fue encontrado en condiciones deplorables, estaba deshidratado y con parásitos','https://www.zooplus.es/magazine/wp-content/uploads/2022/01/Depresion-en-gatos.jpeg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_021035_71Roco.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_021052_279Roco3.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_021157_377Roco2.jpg\"]}',3,1,'2022-03-17 20:02:15','2022-08-24 02:12:00',8,4,0,1,1,'Alergias cutáneas','2022-01-05','2022-01-10',1),(11,'Milo','NO_APADRINADO','Gato','Mestizo','Fue abandonado por su antigua familia, vagaba por las calles estaba lleno de parasitos','https://www.diariodesevilla.es/2021/09/01/mascotas/Cosas-sabias-gatos_1606949991_143253883_667x375.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_021516_604Milo.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_021525_847Milo2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_021534_476Milo3.jpg\"]}',3,1,'2022-03-17 20:03:36','2022-08-24 02:15:38',2,4,0,1,1,'Ninguna','2022-01-05','2022-01-10',1),(12,'Vicky','NO_APADRINADO','Gato','Mestizo','Fue abandonado por su antigua familia, vagaba por las calles estaba lleno de parasitos','https://static.nationalgeographicla.com/files/styles/image_3200/public/01-cat-questions-nationalgeographic_1228126.jpg?w=1600&h=900','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_021856_765Vicky.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_02192_695Vicky2jpg.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_02199_342Vicky3.jpg\"]}',3,1,'2022-03-17 20:05:01','2022-08-24 02:19:11',7,5,0,1,1,'Ninguna','2022-01-05','2022-01-10',0),(13,'Bruno','NO_APADRINADO','Perro','Mestizo','Fue encontrado en condiciones deplorables, estaba deshidratado y con parásitos','https://www.elcolombiano.com/documents/10157/0/810x562/0c0/0d0/none/11101/LKHV/image_content_33647778_20190618090316.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_024626_894Bruno.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_024631_432Bruno2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_024635_975Bruno3.jpg\"]}',2,1,'2022-03-17 20:11:08','2022-08-24 02:46:37',5,20,0,1,1,'Ninguna','2022-01-05','2022-01-10',1),(14,'Cookie','NO_APADRINADO','Perro','Mestizo','Fue abandonado por su antigua familia, vagaba por las calles estaba lleno de parasitos','https://cdn.onemars.net/sites/nutro_es_NkyIN_B9cV/image/nutrodog8_1615970900195.jpeg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_024934_591Cookie.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_024942_152Cookie2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_024947_459Cookie3jpg.jpg\"]}',2,1,'2022-03-17 20:12:51','2022-08-24 02:49:49',4,21,0,1,1,'Ninguna','2022-01-05','2022-01-10',1),(15,'Romeo','NO_APADRINADO','Gato','Mestizo','Fue encontrado en condiciones deplorables, estaba deshidratado y con parásitos','https://www.tqpets.com.ec/wp-content/uploads/2018/08/personalidades-gatos-01.jpg','{\"fotos\": [\"https://leopet.sfo3.digitaloceanspaces.com/20220824_025028_380Romeo.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_025036_190Romeo2.jpg\", \"https://leopet.sfo3.digitaloceanspaces.com/20220824_025043_341Romeo3.jpg\"]}',2,1,'2022-03-17 20:14:28','2022-08-24 02:50:45',2,3,0,1,1,'Ninguna','2022-01-05','2022-01-10',1),(19,'max','NO_APADRINADO','perro','golden','vago','',NULL,65,1,'2023-11-16 02:01:02','2023-11-30 02:39:08',10,15,1,NULL,NULL,'ninguna',NULL,NULL,NULL),(20,'vivi','NO_APADRINADO','gato','chola','juguetona','',NULL,65,0,'2023-11-16 02:19:55','2023-11-30 02:50:18',NULL,3,1,1,NULL,'no',NULL,NULL,NULL),(21,'lucho','NO_APADRINADO','gato','cholo','vago','',NULL,65,0,'2023-11-16 16:14:22','2023-11-30 02:47:48',NULL,4,NULL,1,1,'no',NULL,NULL,NULL),(64,'lucho','NO_APADRINADO','gato','cholo','vago','',NULL,65,0,'2023-11-30 02:52:16','2023-12-16 22:35:20',8,10,1,1,1,'ninguna',NULL,NULL,1),(66,'Chulito','NO_APADRINADO','Perro','French','jugueton','',NULL,65,1,'2024-01-04 22:36:13','2024-01-04 22:36:13',NULL,8,1,1,1,'ninguna',NULL,NULL,1),(73,'Laica','NO_APADRINADO','perro','french','vaga','','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240105_180556_549perroPrueba.jpg\"]}',65,1,'2024-01-05 22:28:53','2024-01-05 23:06:10',2,2,1,1,NULL,'ninguna',NULL,NULL,NULL),(74,'Lola','NO_APADRINADO','Perro','Puduls','Juguetona','','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240106_06166_365perrita-peque%C3%83%C2%B1a-blanca.jpg\"]}',65,1,'2024-01-06 11:16:09','2024-01-06 11:16:09',NULL,2,1,1,1,'NInguna',NULL,NULL,NULL),(88,'selenium','NO_APADRINADO','perro','french','linda','',NULL,65,0,'2024-01-08 11:21:29','2024-01-08 11:21:41',NULL,4,1,1,NULL,'ninguna',NULL,NULL,NULL),(89,'selenium','NO_APADRINADO','perro','french','linda','',NULL,65,1,'2024-01-08 11:21:57','2024-01-08 11:21:57',NULL,4,1,1,NULL,'ninguna',NULL,NULL,NULL),(90,'Ingenieria','NO_APADRINADO','perro','french','vago','','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240108_094722_532perroLike.jpg\"]}',65,1,'2024-01-08 14:47:26','2024-01-08 14:47:26',NULL,5,1,NULL,NULL,'ninguna',NULL,NULL,NULL),(93,'ing2','NO_APADRINADO','perro','puduls','juguetona','','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240108_102246_6perrita-peque%C3%83%C2%B1a-blanca.jpg\"]}',65,1,'2024-01-08 15:22:49','2024-01-08 15:22:49',NULL,5,1,NULL,NULL,'ninguna',NULL,NULL,NULL);
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comision`
--

DROP TABLE IF EXISTS `comision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comision` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fundacion_id` int DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  `total_comision` decimal(10,2) NOT NULL,
  `total_pago` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comi_fundacion_id_idx` (`fundacion_id`),
  CONSTRAINT `fk_comi_fundacion_id` FOREIGN KEY (`fundacion_id`) REFERENCES `fundacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comision`
--

LOCK TABLES `comision` WRITE;
/*!40000 ALTER TABLE `comision` DISABLE KEYS */;
/*!40000 ALTER TABLE `comision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta_bancaria`
--

DROP TABLE IF EXISTS `cuenta_bancaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta_bancaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banco` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fundacion_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `principal` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fundacion_id` (`fundacion_id`),
  CONSTRAINT `cuenta_bancaria_ibfk_1` FOREIGN KEY (`fundacion_id`) REFERENCES `fundacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta_bancaria`
--

LOCK TABLES `cuenta_bancaria` WRITE;
/*!40000 ALTER TABLE `cuenta_bancaria` DISABLE KEYS */;
INSERT INTO `cuenta_bancaria` VALUES (1,'BOLIVARIANO','0021227878','AHORROS','LEOPETXXX',3,NULL,'2022-08-24 03:39:06',1),(2,'PICHINCHA','001545455','CORRIENTE','LEOPETYYY',3,NULL,'2022-08-24 03:39:06',0),(3,'PRODUBANCO','8885554545','AHORROS','XXXXX',2,NULL,NULL,0),(4,'SOLIDARIO','585545454','AHORROS','QQQQQQ',3,'2022-07-22 21:52:24','2022-08-24 03:39:06',0),(6,'GUAYAQUIL','1010101010','AHORROS','HUELLITAS',2,'2022-08-21 13:36:54','2022-08-21 13:36:54',1),(7,'BOLIVARIANO','2020202020','AHORROS','COLITAFELIZ1',1,'2022-08-21 13:39:18','2022-08-21 13:40:02',1),(8,'SOLIDARIO','3030303030','AHORROS','COLITAYYYY',1,'2022-08-21 13:39:59','2022-08-21 13:40:02',0),(10,'Pichincha','0958700049','AHORROS','adair abrigo',65,'2024-01-05 01:56:10','2024-01-05 01:56:10',0),(11,'Pacifico','095870004978','AHORROS','Adair ABrigo',65,'2024-01-06 11:16:39','2024-01-06 11:16:39',0);
/*!40000 ALTER TABLE `cuenta_bancaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donacion`
--

DROP TABLE IF EXISTS `donacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donador_id` int NOT NULL,
  `animal_id` int NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `aprobado` tinyint(1) DEFAULT '0',
  `pagado` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `donador_id` (`donador_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `donacion_ibfk_1` FOREIGN KEY (`donador_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `donacion_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donacion`
--

LOCK TABLES `donacion` WRITE;
/*!40000 ALTER TABLE `donacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `donacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evidencia`
--

DROP TABLE IF EXISTS `evidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donacion_id` int NOT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `galeria` json NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `donacion_id` (`donacion_id`),
  CONSTRAINT `evidencia_ibfk_1` FOREIGN KEY (`donacion_id`) REFERENCES `donacion` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidencia`
--

LOCK TABLES `evidencia` WRITE;
/*!40000 ALTER TABLE `evidencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `evidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundacion`
--

DROP TABLE IF EXISTS `fundacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ruc` varchar(13) DEFAULT NULL,
  `nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `aprobado` tinyint(1) DEFAULT '0',
  `comision` decimal(7,4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `logo` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundacion`
--

LOCK TABLES `fundacion` WRITE;
/*!40000 ALTER TABLE `fundacion` DISABLE KEYS */;
INSERT INTO `fundacion` VALUES (1,'0101010101','Colita feliz','Urdesa','0911111111',1,0.0000,'2022-03-02 19:41:25','2022-08-21 12:08:19','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3I04jO4GHF4ns9UnG4XW57jEowDh3TaWMGXc-N9WoqAF4mvYDOb2s73ZXDTTmDUZ8ytY&usqp=CAU'),(2,'0909090909','Refugio Huellitas','Durán','0922222222',1,0.0000,'2022-03-02 19:41:25','2022-07-22 18:04:09','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3wY1PzsceCwSDZAvNPR-vrgzzmJDD_1QHbQ&usqp=CAU'),(3,'0909090909','Leopet','Alborada','0933333333',1,0.0000,'2022-03-02 19:41:25','2022-07-22 18:04:09','https://www.pregonagropecuario.com/assets/images/upload/perro_Huky_Siberiano.jpg'),(4,'0958700049555','adair','duran','0989998043',1,NULL,'2023-10-31 16:52:13','2023-10-31 16:52:13',''),(5,'0958700049200','adair31','duran','0989998047',1,NULL,'2023-10-31 16:54:59','2023-10-31 16:55:46',''),(65,'1234567890111','fundacion','Calle principal, 123','0999999999',1,NULL,'2023-11-07 23:40:47','2023-11-17 00:30:10',''),(201,'1234567890001','fundacionValida','Calle principal, 123','0999999999',1,0.0000,'2024-01-08 15:08:59','2024-01-08 15:08:59','');
/*!40000 ALTER TABLE `fundacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manada`
--

DROP TABLE IF EXISTS `manada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manada` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `userId` int NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `statusSubscription` tinyint(1) DEFAULT '0',
  `productId` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responseProduct` json DEFAULT NULL,
  `planId` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsePlan` json DEFAULT NULL,
  `subscriptionId` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responseSubscription` json DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `galeriamanada` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `manada_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manada`
--

LOCK TABLES `manada` WRITE;
/*!40000 ALTER TABLE `manada` DISABLE KEYS */;
INSERT INTO `manada` VALUES (82,'Duran',20,65,1,0,NULL,NULL,NULL,NULL,NULL,NULL,'2024-01-05 23:01:36','2024-01-05 23:01:36','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240105_180132_414manadaLobos.jpg\"]}'),(83,'Hembras',15,65,0,0,NULL,NULL,NULL,NULL,NULL,NULL,'2024-01-06 11:17:58','2024-01-07 20:40:59','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240106_061754_51820240105_180556_549perroPrueba.jpg\"]}'),(116,'manada2',20,65,1,0,NULL,NULL,NULL,NULL,NULL,NULL,'2024-01-08 14:49:26','2024-01-08 14:49:26','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240108_094917_542leopet.png\"]}'),(117,'selenium',20,65,0,0,NULL,NULL,NULL,NULL,NULL,NULL,'2024-01-08 14:53:37','2024-01-08 14:53:56',NULL),(121,'ingemanada',10,65,1,0,NULL,NULL,NULL,NULL,NULL,NULL,'2024-01-08 15:24:24','2024-01-08 15:24:24','{\"fotos\": [\"https://leopetimg.s3.amazonaws.com/20240108_102421_775perroLike.jpg\"]}'),(122,'mand5',20,65,1,0,NULL,NULL,NULL,NULL,NULL,NULL,'2024-01-08 15:24:47','2024-01-08 15:24:47',NULL);
/*!40000 ALTER TABLE `manada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manada_animal`
--

DROP TABLE IF EXISTS `manada_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manada_animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `manada_id` int NOT NULL,
  `animal_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manada_id` (`manada_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `manada_animal_ibfk_1` FOREIGN KEY (`manada_id`) REFERENCES `manada` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `manada_animal_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manada_animal`
--

LOCK TABLES `manada_animal` WRITE;
/*!40000 ALTER TABLE `manada_animal` DISABLE KEYS */;
INSERT INTO `manada_animal` VALUES (57,121,93,'2024-01-08 15:25:08','2024-01-08 15:25:08'),(58,121,74,'2024-01-08 15:25:42','2024-01-08 15:25:42');
/*!40000 ALTER TABLE `manada_animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actualizacion_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `fundacion_id` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  `leido` tinyint(1) DEFAULT NULL,
  `fecha_leido` date DEFAULT NULL,
  `calificacion` int DEFAULT NULL,
  `fecha_calificacion` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_not_actualizacion_id_idx` (`actualizacion_id`),
  KEY `fk_not_usuario_id_idx` (`usuario_id`),
  KEY `fk_not_animal_id_idx` (`animal_id`),
  CONSTRAINT `fk_not_actualizacion_id` FOREIGN KEY (`actualizacion_id`) REFERENCES `actualizacion_animal` (`id`),
  CONSTRAINT `fk_not_animal_id` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`),
  CONSTRAINT `fk_not_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
INSERT INTO `notificacion` VALUES (31,22,65,65,73,'2024-01-05','2024-01-05',1,1,'2024-01-05',NULL,NULL),(32,23,65,65,90,'2024-01-08','2024-01-08',1,1,'2024-01-08',NULL,NULL),(33,24,65,65,93,'2024-01-08','2024-01-08',1,1,'2024-01-08',NULL,NULL),(34,25,65,65,93,'2024-01-08','2024-01-08',1,1,'2024-01-08',4,'2024-01-08'),(35,26,65,65,93,'2024-01-11','2024-01-11',1,1,'2024-01-11',NULL,NULL),(36,27,65,65,93,'2024-01-11','2024-01-11',1,1,'2024-01-11',NULL,NULL);
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valor` decimal(19,4) NOT NULL,
  `actualizacion_id` int NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actualizacion_id` (`actualizacion_id`),
  CONSTRAINT `fk_rating` FOREIGN KEY (`actualizacion_id`) REFERENCES `actualizacion_animal` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,8.0000,1,'2022-06-22','2022-06-22'),(2,9.0000,1,'2022-06-22','2022-06-22');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(10) NOT NULL,
  `nombres` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'0909090909','Johanna','Lopez','0909090909',NULL,'admin@gmail.com','$2b$10$UB7QS874eWBhNDCM2swrqOIcU1eFXjjNZnz2141LMovp9fWS27zG.',1,'2022-03-02 19:39:10','2022-03-02 19:39:10'),(2,'0808080808','Alexandra','Ramos','0808080808',NULL,'admin@gmail.com','$2b$10$qt07KX9hTQhGuZ4VJCldNOo2VVRj0FIr0NPchcr5Pkbo3TkPSOKUa',3,'2022-03-02 19:40:08','2022-03-02 19:40:08'),(3,'0909090909','Cecilia','Castillo','0909090909','Florida','colitafeliz@gmail.com','$2b$10$0L5//h5.D0qhxowQbEQV0OfG0g9q/dpXNcgn8pKE1E9HGhPDpca/S',2,'2022-03-02 19:42:17','2022-03-16 06:07:15'),(4,'0909090909','Ricardo','Silva','0909090909','Ceibos','refugiohuellitas@gmail.com','$2b$10$mf8r4P7G6ga73L68l9bLmu6QLJJg0Ufkgckz8QRE0BT2MOlk9wd1S',2,'2022-03-16 06:25:51','2022-03-16 06:25:51'),(5,'0808080808','Cristian','Pincay','0909090909','Sauces','leopet@gmail.com','$2b$10$2PtaWaUryc4MdTeSzQtZLe5oBMlMMF7U9XnFJOdZO4RB3zqZ2PZ/m',2,'2022-03-16 06:34:00','2022-03-16 06:34:00'),(6,'0000000000','Johanna Lopez','NN','NN','NN','johanna.lopez.castillo@gmail.com','',3,'2022-03-23 20:03:03','2022-03-23 20:03:03'),(8,'0909010203','Alex','Vera','0101020105',NULL,'alex@gmail.com','$2b$10$tyf6n/.MGplK51UzNiGUB.3KLGEUG0NtC6HRkMkuA0pOXuLREsb5G',3,'2022-08-21 04:09:36','2022-08-21 04:09:36'),(9,'0909090102','Sofia ','Castro','0909090807',NULL,'sofiacastro@gmail.com','$2b$10$AQxKi4VBqm/w/rBQBMRWQu.iLLN6pB8JSPW5ykzhPrCEzHMEMTUaW',3,'2022-08-21 13:41:47','2022-08-21 13:41:47'),(35,'0958700049','fundacion','fundacion','0989998043','duran','fundacion@gmail.com','$2b$10$NCQq18G34nqk2ubwxAy1XudQllUUJFB39jDc1e07OSwuZAZHliMa2',2,'2023-11-16 16:10:40','2023-11-16 16:10:40'),(65,'0958700077','donador','donador','0989998042',NULL,'donador@gmail.com','$2b$10$534AxOjOswU5C0YnH/1CTOz6GnX9p3Ujaz6BiBRO3xqeyl3OfS.bW',3,'2023-11-21 02:14:24','2023-11-21 02:14:24');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_externo`
--

DROP TABLE IF EXISTS `usuario_externo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_externo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_externo`
--

LOCK TABLES `usuario_externo` WRITE;
/*!40000 ALTER TABLE `usuario_externo` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_externo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-25 15:30:36
