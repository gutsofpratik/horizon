"""Forward llama.cpp's actual weight-loading callback to the UI."""
from contextlib import contextmanager
import math

@contextmanager
def weight_progress(binding, notify):
    binding = getattr(binding, "llama_cpp", binding)
    original = binding.llama_model_default_params
    previous = -1
    def report(value, _user_data):
        nonlocal previous
        if math.isfinite(value):
            percent = max(0, min(100, int(value * 100)))
            if percent != previous:
                previous = percent
                notify({'stage': 'Loading model weights', 'percent': percent})
        return True
    callback = binding.llama_progress_callback(report)
    def params():
        value = original()
        value.progress_callback = callback
        return value
    # Loads are serialized in this private worker. Keep the C callback alive
    # for the entire constructor and restore the binding even on failure.
    binding.llama_model_default_params = params
    try:
        yield
    finally:
        binding.llama_model_default_params = original
