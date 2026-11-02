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

            TempData["ContactNotice"] = "Email delivery is not configured, so your message was not sent. Please connect an email service before using this form.";
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
