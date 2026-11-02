using Microsoft.AspNetCore.Mvc;
using nurkybek.Models;
using System.Diagnostics;

namespace nurkybek.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(new HomeViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Contact(ContactFormModel model)
        {
            if (!ModelState.IsValid)
                return View("Index", new HomeViewModel());

            TempData["ContactNotice"] = "Thanks for reaching out. Message delivery is not configured yet; please email me directly once my address is added here.";
            return RedirectToAction(nameof(Index), "Home", new { contact = "contact" });
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
