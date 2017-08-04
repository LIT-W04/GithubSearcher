using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GithubStuff.Api;

namespace GithubStuff.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetUser(string username)
        {
            return Json(new GithubApi().GetUser(username), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetRepos(string username)
        {
            return Json(new GithubApi().GetReposForUser(username), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetBoth(string username)
        {
            var api = new GithubApi();
            var user = api.GetUser(username);
            var repos = api.GetReposForUser(username);
            return Json(new { User = user, Repos = repos }, JsonRequestBehavior.AllowGet);
        }
    }

   
}
