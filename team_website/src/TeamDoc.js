import React from 'react';
import ruibin from './images/ruibin-bai.jpg'
class TeamDoc extends React.Component {
    render(){
        return (
            <div>
                {/* <!-- Wrapper --> */}
			<div id="wrapper">

				{/* <!-- Header --> */}
					<header id="header" class="alt">
						<span class="logo"><img src="images/logo.svg" alt="" /></span>
						<h1>Team 202107</h1>
					</header>

				{/* <!-- Main --> */}
					<div id="main">

						{/* <!-- Introduction --> */}
							<section id="intro" class="main special">
								
								<header class="major">
									<h2>Member Information</h2>
								</header>
							    <p>CHO, In Jae&emsp;<i>CS</i></p>
                                <p>FANG, Yichu&emsp;<i>CS</i></p>
                                <p>LAU, Yik Lun Yelan&emsp;<i>CS</i></p>
                                <p>PARK, So-Young&emsp;<i>CSAI</i></p>
                                <p>YANG, Jiun-Chi&emsp;<i>CSAI</i></p>
                                <p>WON, Minhyeon&emsp;<i>CSAI</i></p>
								
									
								
							</section>

						{/* <!-- First Section --> */}
							<section id="first" class="main special">
								<header class="major">
									<h2>Project Title</h2>
                                    <h3>Production Job Scheduling Software System</h3>
								</header>
								
							</section>

						{/* <!-- Second Section --> */}
							<section id="second" class="main special">
								<header class="major">
									<h2>Supervisor</h2>
									<span><img src={ruibin} alt='' /></span>
									<h3>Ruibin Bai</h3>
								</header>
								
							</section>

						{/* <!-- Get Started --> */}
							<section id="cta" class="main special">
								<header class="major">
									<h2>Job Scheduling Problems in OR-Tools</h2>
									
								</header>
								<footer class="major">
									<ul class="actions special">
										<li><a href="https://developers.google.com/optimization/scheduling/job_shop" class="button primary">Learn More</a></li>
									</ul>
								</footer>
							</section>

					</div>

				{/* <!-- Footer --> */}
					<footer id="footer">
						<section>
							<h2>Reference</h2>
							<p><a herf="https://html5up.net/stellar">https://html5up.net/stellar</a></p>
							<ul class="actions">
								<li><a href="https://html5up.net/stellar" class="button">Learn More</a></li>
							</ul>
						</section>
						
						<p class="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
					</footer>

			</div>

		{/* <!-- Scripts --> */}
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>
    
            </div>
        );
    }
    
}

export default TeamDoc;