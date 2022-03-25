-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 25, 2022 at 07:12 AM
-- Server version: 5.5.68-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Team202107`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE IF NOT EXISTS `assignment` (
  `aid` int(11) NOT NULL,
  `title` varchar(64) COLLATE utf8_bin NOT NULL,
  `description` varchar(512) COLLATE utf8_bin NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `manager` varchar(16) COLLATE utf8_bin NOT NULL,
  `planner` varchar(16) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`aid`, `title`, `description`, `datecreated`, `manager`, `planner`) VALUES
(1, 'Try for assignment', 'jimmy is handsome', '2022-02-17 09:38:41', 'admin', 'exampleplanner'),
(2, '範例中文任務標題', '範例中文任務内容', '2022-02-19 11:38:13', 'manager', 'examplechinese'),
(3, 'アサインメントタイトル', 'アサインメントディスクリプション', '2022-02-19 11:42:43', 'manager', 'examplejapanese'),
(4, 'Test For Reaaaaaaalllllyyy Long Title abcdefghijklmnopqrstuvwxyz', 'Test For Reeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaalllllllllllllllllllyyyyyyyy Looooooooooooooooooooooooooooooooonng Description ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', '2022-02-19 11:45:54', 'manager', 'exampleplanner'),
(5, '特長中文標題範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸', '特長中文內容範例壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆伍陸柒捌玖拾壹貳叁肆', '2022-02-19 11:51:15', 'manager', 'examplechinese'),
(6, 'مثال ', 'مثال ', '2022-02-19 11:55:11', 'manager', 'examplearabic'),
(7, '残体中文范例标题', '残体中文范例内容', '2022-02-19 11:57:16', 'manager', 'examplechinese');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `scheduleid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(512) COLLATE utf8_bin NOT NULL DEFAULT '',
  `script` text COLLATE utf8_bin NOT NULL,
  `result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `timelength` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `errlog` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `startdate` datetime NOT NULL,
  `uuid` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`scheduleid`, `aid`, `name`, `description`, `script`, `result`, `timelength`, `status`, `errlog`, `startdate`, `uuid`) VALUES
(1, 1, 'Schedule 1', 'This is Schedule 1', '//task=[machine_id, duration]\r\njob1=[[0, 3], [1, 2], [2, 2]]\r\njob2=[[0, 2], [2, 1], [1, 4]]\r\njob3=[[1, 4], [2, 3]]\r\njobs=[job1,job2,job3]\r\n\r\n//optional\r\njob_names=["job_1","job_2", "job_3"]\r\n//optional\r\nmachine_names=["machine_0","machine_1", "machine_2"]\r\n\r\n//remember to return\r\nreturn model.runBasic(jobs)', '[{''start'': 0, ''end'': 5, ''name'': ''Machine 0'', ''id'': ''Machine 0'', ''progress'': 100, ''type'': ''project'', ''hideChildren'': false}, {''start'': 0, ''end'': 2, ''name'': ''job_1 task_0'', ''id'': ''job_1|task_0'', ''job_name'': ''job_1'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 0'', ''styles'': {''progressColor'': ''#FFA87A'', ''progressSelectedColor'': ''#FFA87A''}}, {''start'': 2, ''end'': 5, ''name'': ''job_0 task_0'', ''id'': ''job_0|task_0'', ''job_name'': ''job_0'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 0'', ''styles'': {''progressColor'': ''#FF4829'', ''progressSelectedColor'': ''#FF4829''}}, {''start'': 0, ''end'': 11, ''name'': ''Machine 1'', ''id'': ''Machine 1'', ''progress'': 100, ''type'': ''project'', ''hideChildren'': false}, {''start'': 0, ''end'': 4, ''name'': ''job_2 task_0'', ''id'': ''job_2|task_0'', ''job_name'': ''job_2'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 1'', ''styles'': {''progressColor'': ''#FF36C3'', ''progressSelectedColor'': ''#FF36C3''}}, {''start'': 5, ''end'': 7, ''name'': ''job_0 task_1'', ''id'': ''job_0|task_1'', ''job_name'': ''job_0'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 1'', ''styles'': {''progressColor'': \r\n  ''#FF4829'', ''progressSelectedColor'': ''#FF4829''}}, {''start'': 7, ''end'': 11, ''name'': ''job_1 task_2'', ''id'': ''job_1|task_2'', ''job_name'': ''job_1'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 1'', ''styles'': {''progressColor'': ''#FFA87A'', ''progressSelectedColor'': ''#FFA87A''}}, {''start'': 2, ''end'': 9, ''name'': ''Machine 2'', ''id'': ''Machine 2'', ''progress'': 100, ''type'': ''project'', ''hideChildren'': false}, {''start'': 2, ''end'': 3, ''name'': ''job_1 task_1'', ''id'': ''job_1|task_1'', ''job_name'': ''job_1'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 2'', ''styles'': {''progressColor'': ''#FFA87A'', ''progressSelectedColor'': ''#FFA87A''}}, {''start'': 4, ''end'': 7, \r\n  ''name'': ''job_2 task_1'', ''id'': ''job_2|task_1'', ''job_name'': ''job_2'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 2'', ''styles'': {''progressColor'': ''#FF36C3'', ''progressSelectedColor'': ''#FF36C3''}}, {''start'': 7, ''end'': 9, ''name'': ''job_0 task_2'', ''id'': ''job_0|task_2'', ''job_name'': ''job_0'', ''progress'': 100, ''type'': ''task'', ''project'': ''Machine 2'', ''styles'': {''progressColor'': ''#FF4829'', ''progressSelectedColor'': ''#FF4829''}}]', 11, 0, NULL, '2022-02-18 23:45:32', '7ff6594cb61a4bcb9db0e8bf540a880b'),
(2, 2, 'Schedule 2', 'This is Schedule 2', '//task=[machine_id, duration]\r\n//if one task has multiple machine choices, it can be defined as below\r\njob1=[[0, 3], [[2, 4], [4, 2]], [2, 4]]\r\njob2=[[4, 1],[[2, 1],[3, 12]]]\r\njob3=[[0, 4], [2, 3]]\r\njobs=[job1,job2,job3]\r\n\r\n//optional\r\njob_names=["job_1","job_2", "job_3"]\r\n//optional\r\nmachine_names=["machine_0","machine_2", "machine_3", "machine_4"]\r\n\r\n//remember to return\r\nmodel.runFlexible(jobs)', '[{''start'':0,''name'':''machine_0'',''progress'':100,''end'':7,''id'':''Machine 0'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_0'',''start'':0,''name'':''job_1 task_0'',''progress'':100,''project'':''Machine 0'',''end'':3,''styles'':{''progressColor'':''#FFAB2D'',''progressSelectedColor'':''#FFAB2D''},''id'':''job_0|task_0'',''type'':''task''},{''job_name'':''job_2'',''start'':3,''name'':''job_3 task_0'',''progress'':100,''project'':''Machine 0'',''end'':7,''styles'':{''progressColor'':''#FFF3DD'',''progressSelectedColor'':''#FFF3DD''},''id'':''job_2|task_0'',''type'':''task''},{''start'':1,''name'':''machine_2'',''progress'':100,''end'':12,''id'':''Machine 2'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_1'',''start'':1,''name'':''job_2 task_1'',''progress'':100,''project'':''Machine 2'',''end'':2,''styles'':{''progressColor'':''#FFCC3D'',''progressSelectedColor'':''#FFCC3D''},''id'':''job_1|task_1'',''type'':''task''},{''job_name'':''job_0'',''start'':5,''name'':''job_1 task_2'',''progress'':100,''project'':''Machine 2'',''end'':9,''styles'':{''progressColor'':''#FFAB2D'',''progressSelectedColor'':''#FFAB2D''},''id'':''job_0|task_2'',''type'':''task''},{''job_name'':''job_2'',''start'':9,''name'':''job_3 task_1'',''progress'':100,''project'':''Machine 2'',''end'':12,''styles'':{''progressColor'':''#FFF3DD'',''progressSelectedColor'':''#FFF3DD''},''id'':''job_2|task_1'',''type'':''task''},{''start'':0,''name'':''machine_3'',''progress'':100,''end'':5,''id'':''Machine 4'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_1'',''start'':0,''name'':''job_2 task_0'',''progress'':100,''project'':''Machine 4'',''end'':1,''styles'':{''progressColor'':''#FFCC3D'',''progressSelectedColor'':''#FFCC3D''},''id'':''job_1|task_0'',''type'':''task''},{''job_name'':''job_0'',''start'':3,''name'':''job_1 task_1'',''progress'':100,''project'':''Machine 4'',''end'':5,''styles'':{''progressColor'':''#FFAB2D'',''progressSelectedColor'':''#FFAB2D''},''id'':''job_0|task_1'',''type'':''task''},{''start'':2,''name'':''machine_4'',''progress'':100,''end'':2,''id'':''Machine 3'',''type'':''project'',''hideChildren'':false}]', 12, 0, NULL, '2022-02-19 11:54:04', '618c898680584e39b86657f682a9388c'),
(3, 1, 'Schedule 3', 'This is Schedule 3', '//task=[machine_id, duration]\r\njob1=[[0, 3], [1, 2], [2, 2]]\r\njob2=[[0, 2], [12, 1], [1, 4]]\r\njob3=[[1, 4], [2, 3]]\r\njobs=[job1,job2,job3]\r\n\r\n//priorities will be set in ascending order of expected duration\r\nexpected_duration=[15,15,10]\r\n\r\n//optional\r\njob_names=["job_1","job_2", "job_3"]\r\n//optional\r\nmachine_names=["machine_0","machine_1", "machine_2", "machine_12"]\r\n\r\n//remember to return\r\nmodel.runDynamic(jobs,expected_duration)\r\n//task=[machine_id, duration]\r\njob1=[[0, 3], [1, 2], [2, 2]]\r\njob2=[[0, 2], [12, 1], [1, 4]]\r\njob3=[[1, 4], [2, 3]]\r\njobs=[job1,job2,job3]\r\n\r\n//priorities will be set in ascending order of expected duration\r\nexpected_duration=[15,15,10]\r\n\r\n//optional\r\njob_names=["job_1","job_2", "job_3"]\r\n//optional\r\nmachine_names=["machine_0","machine_1", "machine_2", "machine_12"]\r\n\r\n//remember to return\r\nmodel.runDynamic(jobs,expected_duration)\r\n', '[{''start'':0,''name'':''machine_0'',''progress'':100,''end'':5,''id'':''Machine 0'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_0'',''start'':0,''name'':''job_1 task_0'',''progress'':100,''project'':''Machine 0'',''end'':3,''styles'':{''progressColor'':''#FF367C'',''progressSelectedColor'':''#FF367C''},''id'':''job_0|task_0'',''type'':''task''},{''job_name'':''job_1'',''start'':3,''name'':''job_2 task_0'',''progress'':100,''project'':''Machine 0'',''end'':5,''styles'':{''progressColor'':''#FFBC7A'',''progressSelectedColor'':''#FFBC7A''},''id'':''job_1|task_0'',''type'':''task''},{''start'':0,''name'':''machine_1'',''progress'':100,''end'':10,''id'':''Machine 1'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_2'',''start'':0,''name'':''job_3 task_0'',''progress'':100,''project'':''Machine 1'',''end'':4,''styles'':{''progressColor'':''#FF87CC'',''progressSelectedColor'':''#FF87CC''},''id'':''job_2|task_0'',''type'':''task''},{''job_name'':''job_0'',''start'':4,''name'':''job_1 task_1'',''progress'':100,''project'':''Machine 1'',''end'':6,''styles'':{''progressColor'':''#FF367C'',''progressSelectedColor'':''#FF367C''},''id'':''job_0|task_1'',''type'':''task''},{''job_name'':''job_1'',''start'':6,''name'':''job_2 task_2'',''progress'':100,''project'':''Machine 1'',''end'':10,''styles'':{''progressColor'':''#FFBC7A'',''progressSelectedColor'':''#FFBC7A''},''id'':''job_1|task_2'',''type'':''task''},{''start'':4,''name'':''machine_2'',''progress'':100,''end'':9,''id'':''Machine 2'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_2'',''start'':4,''name'':''job_3 task_1'',''progress'':100,''project'':''Machine 2'',''end'':7,''styles'':{''progressColor'':''#FF87CC'',''progressSelectedColor'':''#FF87CC''},''id'':''job_2|task_1'',''type'':''task''},{''job_name'':''job_0'',''start'':7,''name'':''job_1 task_2'',''progress'':100,''project'':''Machine 2'',''end'':9,''styles'':{''progressColor'':''#FF367C'',''progressSelectedColor'':''#FF367C''},''id'':''job_0|task_2'',''type'':''task''},{''start'':5,''name'':''machine_12'',''progress'':100,''end'':6,''id'':''Machine 12'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_1'',''start'':5,''name'':''job_2 task_1'',''progress'':100,''project'':''Machine 12'',''end'':6,''styles'':{''progressColor'':''#FFBC7A'',''progressSelectedColor'':''#FFBC7A''},''id'':''job_1|task_1'',''type'':''task''}]', 10, 0, NULL, '2022-02-20 00:23:09', '26add0a554b44f72afec2405f365f8e4'),
(4, 4, 'Schedule 4', 'This is Schedule 4', '//task=[machine_id, duration]\r\n//if one task has multiple concurrent processes on different machines, it can be defined as below\r\njob1=[[0, 3], [[1, 2], [10,1]], [[2, 2],[12, 10]]]\r\njob2=[[0, 2], [2, 1], [1, 4]]\r\njob3=[[1, 4], [2, 3]]\r\njobs=[job1,job2,job3]\r\n\r\n//optional\r\njob_names=["job_1","job_2", "job_3"]\r\n//optional\r\nmachine_names=["machine_0","machine_1", "machine_2", "machine_10", "machine_12"]\r\n\r\n//remember to return\r\nmodel.runMulti(jobs)', '[{''start'':0,''name'':''machine_0'',''progress'':100,''end'':5,''id'':''Machine 0'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_0'',''start'':0,''name'':''job_1 task_0'',''progress'':100,''project'':''Machine 0'',''end'':3,''styles'':{''progressColor'':''#FF1944'',''progressSelectedColor'':''#FF1944''},''id'':''job_0|task_0'',''type'':''task''},{''job_name'':''job_1'',''start'':3,''name'':''job_2 task_0'',''progress'':100,''project'':''Machine 0'',''end'':5,''styles'':{''progressColor'':''#FFCD7D'',''progressSelectedColor'':''#FFCD7D''},''id'':''job_1|task_0'',''type'':''task''},{''start'':3,''name'':''machine_1'',''progress'':100,''end'':13,''id'':''Machine 1'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_0'',''start'':3,''name'':''job_1 task_1'',''progress'':100,''project'':''Machine 1'',''end'':5,''styles'':{''progressColor'':''#FF1944'',''progressSelectedColor'':''#FF1944''},''id'':''job_0|task_1'',''type'':''task''},{''job_name'':''job_2'',''start'':5,''name'':''job_3 task_0'',''progress'':100,''project'':''Machine 1'',''end'':9,''styles'':{''progressColor'':''#FF9CCC'',''progressSelectedColor'':''#FF9CCC''},''id'':''job_2|task_0'',''type'':''task''},{''job_name'':''job_1'',''start'':9,''name'':''job_2 task_2'',''progress'':100,''project'':''Machine 1'',''end'':13,''styles'':{''progressColor'':''#FFCD7D'',''progressSelectedColor'':''#FFCD7D''},''id'':''job_1|task_2'',''type'':''task''},{''start'':3,''name'':''machine_2'',''progress'':100,''end'':4,''id'':''Machine 10'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_0'',''start'':3,''name'':''job_1 task_1'',''progress'':100,''project'':''Machine 10'',''end'':4,''styles'':{''progressColor'':''#FF1944'',''progressSelectedColor'':''#FF1944''},''id'':''job_0|task_1'',''type'':''task''},{''start'':5,''name'':''machine_10'',''progress'':100,''end'':12,''id'':''Machine 2'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_1'',''start'':5,''name'':''job_2 task_1'',''progress'':100,''project'':''Machine 2'',''end'':6,''styles'':{''progressColor'':''#FFCD7D'',''progressSelectedColor'':''#FFCD7D''},''id'':''job_1|task_1'',''type'':''task''},{''job_name'':''job_0'',''start'':6,''name'':''job_1 task_2'',''progress'':100,''project'':''Machine 2'',''end'':8,''styles'':{''progressColor'':''#FF1944'',''progressSelectedColor'':''#FF1944''},''id'':''job_0|task_2'',''type'':''task''},{''job_name'':''job_2'',''start'':9,''name'':''job_3 task_1'',''progress'':100,''project'':''Machine 2'',''end'':12,''styles'':{''progressColor'':''#FF9CCC'',''progressSelectedColor'':''#FF9CCC''},''id'':''job_2|task_1'',''type'':''task''},{''start'':5,''name'':''machine_12'',''progress'':100,''end'':15,''id'':''Machine 12'',''type'':''project'',''hideChildren'':false},{''job_name'':''job_0'',''start'':5,''name'':''job_1 task_2'',''progress'':100,''project'':''Machine 12'',''end'':15,''styles'':{''progressColor'':''#FF1944'',''progressSelectedColor'':''#FF1944''},''id'':''job_0|task_2'',''type'':''task''}]', 15, 0, NULL, '2022-02-20 00:24:22', '53ce138d2a5742ba972f41ebda5fcf20');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE IF NOT EXISTS `token` (
  `token` varchar(128) COLLATE utf8_bin NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateexpire` datetime DEFAULT NULL,
  `role` int(1) NOT NULL DEFAULT '0',
  `uses` int(11) NOT NULL DEFAULT '1',
  `disabled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`token`, `datecreated`, `dateexpire`, `role`, `uses`, `disabled`) VALUES
('aaaaa', '2022-01-08 12:55:22', NULL, 0, 0, 0),
('aaaaaa', '2022-01-08 14:01:49', NULL, 0, 0, 0),
('abc', '2022-01-08 13:20:21', NULL, 0, 1, 0),
('asd', '2022-01-08 14:01:18', '2022-01-01 14:01:09', 0, 1, 0),
('gsffds', '2022-01-08 13:20:33', '2022-01-31 13:20:24', 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL,
  `username` varchar(16) COLLATE utf8_bin NOT NULL,
  `displayname` varchar(64) COLLATE utf8_bin NOT NULL,
  `password` varchar(256) COLLATE utf8_bin NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` int(1) NOT NULL DEFAULT '0',
  `disabled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `displayname`, `password`, `datecreated`, `role`, `disabled`) VALUES
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`aid`),
  ADD KEY `manager` (`manager`),
  ADD KEY `planner` (`planner`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`scheduleid`),
  ADD KEY `aid` (`aid`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`manager`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`planner`) REFERENCES `user` (`username`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`aid`) REFERENCES `assignment` (`aid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
