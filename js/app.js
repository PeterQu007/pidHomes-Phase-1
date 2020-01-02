//3rd party npm
import $ from "jquery";
import slick from "slick-carousel";

import HeroSlider from "./modules/HeroSlider";
import RevealOnScroll from "./modules/RevealOnScroll";
import GoogleMap from "./modules/GoogleMap";
import Search from "./modules/Search";
import pidChart from "./modules/pidChart";
import pidDemographics from "./modules/pidDemographics";

var heroSlider = new HeroSlider();
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");
var googleMap = new GoogleMap();
var search = new Search();
var chart = new pidChart();
var demographics = new pidDemographics();
