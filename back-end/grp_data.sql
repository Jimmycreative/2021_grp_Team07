-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2022 at 12:38 PM
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

--
-- Dumping data for table `assignment`
--

INSERT IGNORE INTO `assignment` (`aid`, `title`, `description`, `datecreated`, `manager`, `planner`) VALUES
(1, 'Try for assignment', 'jimmy is handsome', '2022-02-17 09:38:41', 'admin', 'exampleplanner'),
(2, '範例中文任務標題', '範例中文任務内容', '2022-02-19 11:38:13', 'manager', 'examplechinese'),
(3, 'アサインメントタイトル', 'アサインメントディスクリプション', '2022-02-19 11:42:43', 'manager', 'examplejapanese'),
(4, 'Test For Reaaaaaaalllllyyy Long Title abcdefghijklmnopqrstuvwxyz', 'Test For Reeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaalllllllllllllllllllyyyyyyyy Looooooooooooooooooooooooooooooooonng Description ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', '2022-02-19 11:45:54', 'manager', 'exampleplanner'),
(5, '特長中文標題範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸', '特長中文內容範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆', '2022-02-19 11:51:15', 'manager', 'examplechinese'),
(6, 'مثال ', 'مثال ', '2022-02-19 11:55:11', 'manager', 'examplearabic'),
(7, '残体中文范例标题', '残体中文范例内容', '2022-02-19 11:57:16', 'manager', 'examplechinese');

--
-- Dumping data for table `schedule`
--

INSERT IGNORE INTO `schedule` (`scheduleid`, `aid`, `name`, `description`, `script`, `result`, `timelength`, `status`, `errlog`, `startdate`, `uuid`) VALUES
(1, 1, 'Test', 'Okay Test', '', '', 1, 0, NULL, '2022-02-18 23:45:32', ''),
(2, 2, '範例中文排程標題', '範例中文排程内容', '', '', 3, 0, NULL, '2022-02-19 11:54:04', ''),
(3, 1, 'Example English Schedule', 'Example English Description', '', '', 4, 0, NULL, '2022-02-19 12:02:53', ''),
(5, 4, 'Test For Reaaaaaaalllllyyy Long Title abcdefghijklmnopqrstuvwxyz', 'Test For Reeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaalllllllllllllllllllyyyyyyyy Looooooooooooooooooooooooooooooooonng Description ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', '', '', 5, 0, NULL, '2022-02-19 12:22:29', ''),
(6, 5, '特長中文標題範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸', '特長中文內容範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆', '', '', 32, 0, NULL, '2022-02-19 12:25:00', '');

--
-- Dumping data for table `token`
--

INSERT IGNORE INTO `token` (`token`, `datecreated`, `dateexpire`, `role`, `uses`, `disabled`) VALUES
('aaaaa', '2022-01-08 12:55:22', NULL, 0, 0, 0),
('aaaaaa', '2022-01-08 14:01:49', NULL, 0, 0, 0),
('abc', '2022-01-08 13:20:21', NULL, 0, 1, 0),
('asd', '2022-01-08 14:01:18', '2022-01-01 14:01:09', 0, 1, 0),
('gsffds', '2022-01-08 13:20:33', '2022-01-31 13:20:24', 0, 1, 0);

--
-- Dumping data for table `user`
--

INSERT IGNORE INTO `user` (`uid`, `username`, `displayname`, `password`, `datecreated`, `role`, `disabled`) VALUES
(1, 'shawn', 'shawn', '123456', '2022-01-05 09:38:41', 0, 0),
(2, 'admin', 'admin', 'admin', '2021-01-05 18:32:38', 1, 0),
(3, 'exampleban', 'Banned Account', 'test', '2022-02-17 18:33:02', 0, 1),
(4, 'jimmy', 'Jimmy Yang', 'jimmyishandsome', '2020-01-08 18:33:30', 1, 0),
(5, 'manager', 'Manager', 'test', '2022-02-17 18:33:51', 1, 0),
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
