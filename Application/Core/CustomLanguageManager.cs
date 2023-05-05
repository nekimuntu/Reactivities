using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class CustomLanguageManager : FluentValidation.Resources.LanguageManager
    {
        public CustomLanguageManager()
        {
            AddTranslation("en", "NotEmptyValidator", "'{PropertyName}' is required.");
            AddTranslation("en-US", "NotNEmptyValidator", "'{PropertyName}' is required.");
            AddTranslation("en-GB", "NotEmptyValidator", "'{PropertyName}' is required.");
        }
    }
}