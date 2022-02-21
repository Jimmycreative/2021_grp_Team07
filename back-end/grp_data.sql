-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2022 at 05:29 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grp`
--
CREATE DATABASE IF NOT EXISTS `grp` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `grp`;

--
-- Truncate table before insert `assignment`
--

TRUNCATE TABLE `assignment`;
--
-- Dumping data for table `assignment`
--

INSERT IGNORE INTO `assignment` (`aid`, `title`, `description`, `datecreated`, `manager`, `planner`) VALUES
(1, 'Assignment Title', 'Assignment content', '2022-02-17 09:38:41', 'admin', 'exampleplanner'),
(2, '範例中文任務標題', '範例中文任務内容', '2022-02-19 11:38:13', 'manager', 'examplechinese'),
(3, 'アサインメントタイトル', 'アサインメントディスクリプション', '2022-02-19 11:42:43', 'manager', 'examplejapanese'),
(4, 'Test For Reaaaaaaalllllyyy Long Title abcdefghijklmnopqrstuvwxyz', 'Test For Reeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaalllllllllllllllllllyyyyyyyy Looooooooooooooooooooooooooooooooonng Description ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', '2022-02-19 11:45:54', 'manager', 'exampleplanner'),
(5, '特長中文標題範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸', '特長中文內容範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆', '2022-02-19 11:51:15', 'manager', 'examplechinese'),
(6, 'مثال ', 'مثال ', '2022-02-19 11:55:11', 'manager', 'examplearabic'),
(7, '简体中文范例标题', '简体中文范例内容', '2022-02-19 11:57:16', 'manager', 'examplechinese');

--
-- Truncate table before insert `schedule`
--

TRUNCATE TABLE `schedule`;
--
-- Dumping data for table `schedule`
--
INSERT INTO `schedule` VALUES (1, 1, 'Schedule 1', 'This is Schedule 1', 0x2F2F7461736B3D5B6D616368696E655F69642C206475726174696F6E5D0D0A6A6F62313D5B5B302C20335D2C205B312C20325D2C205B322C20325D5D0D0A6A6F62323D5B5B302C20325D2C205B31322C20315D2C205B312C20345D5D0D0A6A6F62333D5B5B312C20345D2C205B322C20335D5D0D0A6A6F62733D5B6A6F62312C6A6F62322C6A6F62335D0D0A0D0A2F2F7072696F7269746965732077696C6C2062652073657420696E20617363656E64696E67206F72646572206F66206578706563746564206475726174696F6E0D0A65787065637465645F6475726174696F6E3D5B31352C31352C31305D0D0A0D0A2F2F6F7074696F6E616C0D0A6A6F625F6E616D65733D5B226A6F625F31222C226A6F625F32222C20226A6F625F33225D0D0A2F2F6F7074696F6E616C0D0A6D616368696E655F6E616D65733D5B226D616368696E655F30222C226D616368696E655F31222C20226D616368696E655F32222C20226D616368696E655F3132225D0D0A0D0A2F2F72656D656D62657220746F2072657475726E0D0A6D6F64656C2E72756E44796E616D6963286A6F62732C65787065637465645F6475726174696F6E290D0A2F2F7461736B3D5B6D616368696E655F69642C206475726174696F6E5D0D0A6A6F62313D5B5B302C20335D2C205B312C20325D2C205B322C20325D5D0D0A6A6F62323D5B5B302C20325D2C205B31322C20315D2C205B312C20345D5D0D0A6A6F62333D5B5B312C20345D2C205B322C20335D5D0D0A6A6F62733D5B6A6F62312C6A6F62322C6A6F62335D0D0A0D0A2F2F7072696F7269746965732077696C6C2062652073657420696E20617363656E64696E67206F72646572206F66206578706563746564206475726174696F6E0D0A65787065637465645F6475726174696F6E3D5B31352C31352C31305D0D0A0D0A2F2F6F7074696F6E616C0D0A6A6F625F6E616D65733D5B226A6F625F31222C226A6F625F32222C20226A6F625F33225D0D0A2F2F6F7074696F6E616C0D0A6D616368696E655F6E616D65733D5B226D616368696E655F30222C226D616368696E655F31222C20226D616368696E655F32222C20226D616368696E655F3132225D0D0A0D0A2F2F72656D656D62657220746F2072657475726E0D0A6D6F64656C2E72756E44796E616D6963286A6F62732C65787065637465645F6475726174696F6E290D0A, 0x5B7B277374617274273A302C276E616D65273A276D616368696E655F30272C2770726F6772657373273A3130302C27656E64273A352C276964273A2735363362356163633932313031316563383561366363366231653561336132307C4D616368696E652030272C2774797065273A2770726F6A656374272C27686964654368696C6472656E273A66616C73657D2C7B276A6F625F6E616D65273A276A6F625F31272C277374617274273A302C276E616D65273A276A6F625F32207461736B5F30272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652030272C27656E64273A322C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464644314442272C2770726F677265737353656C6563746564436F6C6F72273A2723464644314442277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F317C7461736B5F30272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F30272C277374617274273A322C276E616D65273A276A6F625F31207461736B5F30272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652030272C27656E64273A352C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464634444635272C2770726F677265737353656C6563746564436F6C6F72273A2723464634444635277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F307C7461736B5F30272C2774797065273A277461736B277D2C7B277374617274273A302C276E616D65273A276D616368696E655F31272C2770726F6772657373273A3130302C27656E64273A31312C276964273A2735363362356163633932313031316563383561366363366231653561336132307C4D616368696E652031272C2774797065273A2770726F6A656374272C27686964654368696C6472656E273A66616C73657D2C7B276A6F625F6E616D65273A276A6F625F32272C277374617274273A302C276E616D65273A276A6F625F33207461736B5F30272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652031272C27656E64273A342C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464631333136272C2770726F677265737353656C6563746564436F6C6F72273A2723464631333136277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F327C7461736B5F30272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F30272C277374617274273A352C276E616D65273A276A6F625F31207461736B5F31272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652031272C27656E64273A372C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464634444635272C2770726F677265737353656C6563746564436F6C6F72273A2723464634444635277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F307C7461736B5F31272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F31272C277374617274273A372C276E616D65273A276A6F625F32207461736B5F32272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652031272C27656E64273A31312C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464644314442272C2770726F677265737353656C6563746564436F6C6F72273A2723464644314442277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F317C7461736B5F32272C2774797065273A277461736B277D2C7B277374617274273A322C276E616D65273A276D616368696E655F32272C2770726F6772657373273A3130302C27656E64273A392C276964273A2735363362356163633932313031316563383561366363366231653561336132307C4D616368696E652032272C2774797065273A2770726F6A656374272C27686964654368696C6472656E273A66616C73657D2C7B276A6F625F6E616D65273A276A6F625F31272C277374617274273A322C276E616D65273A276A6F625F32207461736B5F31272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652032272C27656E64273A332C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464644314442272C2770726F677265737353656C6563746564436F6C6F72273A2723464644314442277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F317C7461736B5F31272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F32272C277374617274273A342C276E616D65273A276A6F625F33207461736B5F31272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652032272C27656E64273A372C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464631333136272C2770726F677265737353656C6563746564436F6C6F72273A2723464631333136277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F327C7461736B5F31272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F30272C277374617274273A372C276E616D65273A276A6F625F31207461736B5F32272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652032272C27656E64273A392C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464634444635272C2770726F677265737353656C6563746564436F6C6F72273A2723464634444635277D2C276964273A2735363362356163633932313031316563383561366363366231653561336132307C6A6F625F307C7461736B5F32272C2774797065273A277461736B277D5D, 11, 0, NULL, '2022-2-20 00:23:09', '26add0a554b44f72afec2405f365f8e4');
INSERT INTO `schedule` VALUES (2, 2, 'Schedule 2', 'This is Schedule 2', 0x2F2F7461736B3D5B6D616368696E655F69642C206475726174696F6E5D0D0A2F2F6966206F6E65207461736B20686173206D756C7469706C6520636F6E63757272656E742070726F636573736573206F6E20646966666572656E74206D616368696E65732C2069742063616E20626520646566696E65642061732062656C6F770D0A6A6F62313D5B5B302C20335D2C205B5B312C20325D2C205B31302C315D5D2C205B5B322C20325D2C5B31322C2031305D5D5D0D0A6A6F62323D5B5B302C20325D2C205B322C20315D2C205B312C20345D5D0D0A6A6F62333D5B5B312C20345D2C205B322C20335D5D0D0A6A6F62733D5B6A6F62312C6A6F62322C6A6F62335D0D0A0D0A2F2F6F7074696F6E616C0D0A6A6F625F6E616D65733D5B226A6F625F31222C226A6F625F32222C20226A6F625F33225D0D0A2F2F6F7074696F6E616C0D0A6D616368696E655F6E616D65733D5B226D616368696E655F30222C226D616368696E655F31222C20226D616368696E655F32222C20226D616368696E655F3130222C20226D616368696E655F3132225D0D0A0D0A2F2F72656D656D62657220746F2072657475726E0D0A6D6F64656C2E72756E4D756C7469286A6F627329, 0x5B7B277374617274273A302C276E616D65273A276D616368696E655F30272C2770726F6772657373273A3130302C27656E64273A372C276964273A2737633834626264373932313031316563616465616363366231653561336132307C4D616368696E652030272C2774797065273A2770726F6A656374272C27686964654368696C6472656E273A66616C73657D2C7B276A6F625F6E616D65273A276A6F625F30272C277374617274273A302C276E616D65273A276A6F625F31207461736B5F30272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652030272C27656E64273A332C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464637343536272C2770726F677265737353656C6563746564436F6C6F72273A2723464637343536277D2C276964273A2737633834626264373932313031316563616465616363366231653561336132307C6A6F625F307C7461736B5F30272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F32272C277374617274273A332C276E616D65273A276A6F625F33207461736B5F30272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652030272C27656E64273A372C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464644414138272C2770726F677265737353656C6563746564436F6C6F72273A2723464644414138277D2C276964273A2737633834626264373932313031316563616465616363366231653561336132307C6A6F625F327C7461736B5F30272C2774797065273A277461736B277D2C7B277374617274273A312C276E616D65273A276D616368696E655F32272C2770726F6772657373273A3130302C27656E64273A31322C276964273A2737633834626264373932313031316563616465616363366231653561336132307C4D616368696E652032272C2774797065273A2770726F6A656374272C27686964654368696C6472656E273A66616C73657D2C7B276A6F625F6E616D65273A276A6F625F31272C277374617274273A312C276E616D65273A276A6F625F32207461736B5F31272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652032272C27656E64273A322C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464636364537272C2770726F677265737353656C6563746564436F6C6F72273A2723464636364537277D2C276964273A2737633834626264373932313031316563616465616363366231653561336132307C6A6F625F317C7461736B5F31272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F30272C277374617274273A352C276E616D65273A276A6F625F31207461736B5F32272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652032272C27656E64273A392C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464637343536272C2770726F677265737353656C6563746564436F6C6F72273A2723464637343536277D2C276964273A2737633834626264373932313031316563616465616363366231653561336132307C6A6F625F307C7461736B5F32272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F32272C277374617274273A392C276E616D65273A276A6F625F33207461736B5F31272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652032272C27656E64273A31322C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464644414138272C2770726F677265737353656C6563746564436F6C6F72273A2723464644414138277D2C276964273A2737633834626264373932313031316563616465616363366231653561336132307C6A6F625F327C7461736B5F31272C2774797065273A277461736B277D2C7B277374617274273A302C276E616D65273A276D616368696E655F33272C2770726F6772657373273A3130302C27656E64273A352C276964273A2737633834626264373932313031316563616465616363366231653561336132307C4D616368696E652034272C2774797065273A2770726F6A656374272C27686964654368696C6472656E273A66616C73657D2C7B276A6F625F6E616D65273A276A6F625F31272C277374617274273A302C276E616D65273A276A6F625F32207461736B5F30272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652034272C27656E64273A312C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464636364537272C2770726F677265737353656C6563746564436F6C6F72273A2723464636364537277D2C276964273A2737633834626264373932313031316563616465616363366231653561336132307C6A6F625F317C7461736B5F30272C2774797065273A277461736B277D2C7B276A6F625F6E616D65273A276A6F625F30272C277374617274273A332C276E616D65273A276A6F625F31207461736B5F31272C2770726F6772657373273A3130302C2770726F6A656374273A274D616368696E652034272C27656E64273A352C277374796C6573273A7B2770726F6772657373436F6C6F72273A2723464637343536272C2770726F677265737353656C6563746564436F6C6F72273A2723464637343536277D2C276964273A2737633834626264373932313031316563616465616363366231653561336132307C6A6F625F307C7461736B5F31272C2774797065273A277461736B277D2C7B277374617274273A322C276E616D65273A276D616368696E655F34272C2770726F6772657373273A3130302C27656E64273A322C276964273A2737633834626264373932313031316563616465616363366231653561336132307C4D616368696E652033272C2774797065273A2770726F6A656374272C27686964654368696C6472656E273A66616C73657D5D, 12, 0, NULL, '2022-2-20 00:24:22', '53ce138d2a5742ba972f41ebda5fcf20');


-- INSERT IGNORE INTO `schedule` (`scheduleid`, `aid`, `name`, `description`, `script`, `result`, `timelength`, `status`, `errlog`, `startdate`, `uuid`) VALUES
-- (1, 1, 'Schedule 1', 'This is Schedule 1', '//task=[machine_id, duration]
-- job1=[[0, 3], [1, 2], [2, 2]]
-- job2=[[0, 2], [2, 1], [1, 4]]
-- job3=[[1, 4], [2, 3]]
-- jobs=[job1,job2,job3]

-- //optional
-- job_names=["job_1","job_2", "job_3"]
-- //optional
-- machine_names=["machine_0","machine_1", "machine_2"]

-- //remember to return
-- return model.runBasic(jobs)', "[{'start': 0, 'end': 5, 'name': 'Machine 0', 'id': 'Machine 0', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 0, 'end': 2, 'name': 'job_1 task_0', 'id': 'job_1|task_0', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 0', 'styles': {'progressColor': '#FFA87A', 'progressSelectedColor': '#FFA87A'}}, {'start': 2, 'end': 5, 'name': 'job_0 task_0', 'id': 'job_0|task_0', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 0', 'styles': {'progressColor': '#FF4829', 'progressSelectedColor': '#FF4829'}}, {'start': 0, 'end': 11, 'name': 'Machine 1', 'id': 'Machine 1', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 0, 'end': 4, 'name': 'job_2 task_0', 'id': 'job_2|task_0', 'job_name': 'job_2', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': '#FF36C3', 'progressSelectedColor': '#FF36C3'}}, {'start': 5, 'end': 7, 'name': 'job_0 task_1', 'id': 'job_0|task_1', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': 
--   '#FF4829', 'progressSelectedColor': '#FF4829'}}, {'start': 7, 'end': 11, 'name': 'job_1 task_2', 'id': 'job_1|task_2', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': '#FFA87A', 'progressSelectedColor': '#FFA87A'}}, {'start': 2, 'end': 9, 'name': 'Machine 2', 'id': 'Machine 2', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 2, 'end': 3, 'name': 'job_1 task_1', 'id': 'job_1|task_1', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': '#FFA87A', 'progressSelectedColor': '#FFA87A'}}, {'start': 4, 'end': 7, 
--   'name': 'job_2 task_1', 'id': 'job_2|task_1', 'job_name': 'job_2', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': '#FF36C3', 'progressSelectedColor': '#FF36C3'}}, {'start': 7, 'end': 9, 'name': 'job_0 task_2', 'id': 'job_0|task_2', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': '#FF4829', 'progressSelectedColor': '#FF4829'}}]", 11, 0, NULL, '2022-02-18 23:45:32', '7ff6594cb61a4bcb9db0e8bf540a880b'),
-- (2, 2, 'Schedule 2', 'This is Schedule 2', '//task=[machine_id, duration]
-- //if one task has multiple machine choices, it can be defined as below
-- job1=[[0, 3], [[2, 4], [4, 2]], [2, 4]]
-- job2=[[4, 1],[[2, 1],[3, 12]]]
-- job3=[[0, 4], [2, 3]]
-- jobs=[job1,job2,job3]

-- //optional
-- job_names=["job_1","job_2", "job_3"]
-- //optional
-- machine_names=["machine_0","machine_2", "machine_3", "machine_4"]

-- //remember to return
-- model.runFlexible(jobs)', "[{'start':0,'name':'machine_0','progress':100,'end':7,'id':'Machine 0','type':'project','hideChildren':false},{'job_name':'job_0','start':0,'name':'job_1 task_0','progress':100,'project':'Machine 0','end':3,'styles':{'progressColor':'#FFAB2D','progressSelectedColor':'#FFAB2D'},'id':'job_0|task_0','type':'task'},{'job_name':'job_2','start':3,'name':'job_3 task_0','progress':100,'project':'Machine 0','end':7,'styles':{'progressColor':'#FFF3DD','progressSelectedColor':'#FFF3DD'},'id':'job_2|task_0','type':'task'},{'start':1,'name':'machine_2','progress':100,'end':12,'id':'Machine 2','type':'project','hideChildren':false},{'job_name':'job_1','start':1,'name':'job_2 task_1','progress':100,'project':'Machine 2','end':2,'styles':{'progressColor':'#FFCC3D','progressSelectedColor':'#FFCC3D'},'id':'job_1|task_1','type':'task'},{'job_name':'job_0','start':5,'name':'job_1 task_2','progress':100,'project':'Machine 2','end':9,'styles':{'progressColor':'#FFAB2D','progressSelectedColor':'#FFAB2D'},'id':'job_0|task_2','type':'task'},{'job_name':'job_2','start':9,'name':'job_3 task_1','progress':100,'project':'Machine 2','end':12,'styles':{'progressColor':'#FFF3DD','progressSelectedColor':'#FFF3DD'},'id':'job_2|task_1','type':'task'},{'start':0,'name':'machine_3','progress':100,'end':5,'id':'Machine 4','type':'project','hideChildren':false},{'job_name':'job_1','start':0,'name':'job_2 task_0','progress':100,'project':'Machine 4','end':1,'styles':{'progressColor':'#FFCC3D','progressSelectedColor':'#FFCC3D'},'id':'job_1|task_0','type':'task'},{'job_name':'job_0','start':3,'name':'job_1 task_1','progress':100,'project':'Machine 4','end':5,'styles':{'progressColor':'#FFAB2D','progressSelectedColor':'#FFAB2D'},'id':'job_0|task_1','type':'task'},{'start':2,'name':'machine_4','progress':100,'end':2,'id':'Machine 3','type':'project','hideChildren':false}]", 12, 0, NULL, '2022-02-19 11:54:04', '618c898680584e39b86657f682a9388c');

--
-- Truncate table before insert `token`
--

TRUNCATE TABLE `token`;
--
-- Dumping data for table `token`
--

INSERT IGNORE INTO `token` (`tokenid`, `datecreated`, `dateexpire`, `role`, `uses`, `disabled`) VALUES
('aaaaa', '2022-01-08 12:55:22', NULL, 0, 0, 0),
('aaaaaa', '2022-01-08 14:01:49', NULL, 0, 0, 0),
('abc', '2022-01-08 13:20:21', NULL, 0, 1, 0),
('asd', '2022-01-08 14:01:18', '2022-01-01 14:01:09', 0, 1, 0),
('gsffds', '2022-01-08 13:20:33', '2022-01-31 13:20:24', 0, 1, 0);

--
-- Truncate table before insert `user`
--

TRUNCATE TABLE `user`;
--
-- Dumping data for table `user`
--

INSERT IGNORE INTO `user` (`uid`, `username`, `displayname`, `password`, `datecreated`, `role`, `disabled`) VALUES
(1, 'shawn', 'shawn', '123456', '2022-01-05 09:38:41', 0, 0),
(2, 'admin', 'admin', 'admin', '2021-01-05 18:32:38', 1, 0),
(3, 'exampleban', 'Banned Account', 'test', '2022-02-17 18:33:02', 0, 1),
(5, 'examplemanager', 'Manager', 'test', '2022-02-17 18:33:51', 1, 0),
(6, 'exampleplanner', 'Example Planner', 'test', '2022-02-07 18:34:15', 0, 0),
(7, 'johncena', 'John Cena', 'youcantseememytimeisnow', '2022-02-17 18:34:49', 0, 0),
(8, 'incho', 'Injae Cho', 'jaejaecho1322', '2022-02-17 18:35:25', 0, 0),
(9, 'examplechinese', '範例使用者', 'test', '2022-02-18 22:00:53', 0, 0),
(10, 'examplejapanese', 'サンプルユーザー', 'test', '2022-02-09 12:18:35', 0, 0),
(11, 'examplekorean', '예시 사용자', 'test', '2022-01-19 22:11:04', 0, 0),
(12, 'examplearabic', 'مستخدم سبيل المثال ', 'test', '2022-02-18 22:12:27', 0, 0),
(13, 'examplehindi', 'उदाहरण उपयोगकर्ता', 'test', '2022-02-09 05:34:15', 0, 0),
(14, 'examplelong_user', 'Pablo Diego José Francisco de Paula Juan Nepomuceno María de los', 'test', '2022-02-19 11:59:38', 0, 0),
(15, 'examplelong_zhtw', '帕布羅・迭戈・荷瑟・弗朗西斯科・德・保拉・居安・尼波莫切諾・克瑞斯皮尼亞諾・德・羅斯・瑞米迪歐斯・西波瑞亞諾・德・拉・山迪西瑪・', 'test', '2022-02-19 12:12:28', 0, 0),
(16, 'examplemix', 'Example 使用者', 'test', '2022-02-19 12:19:13', 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
