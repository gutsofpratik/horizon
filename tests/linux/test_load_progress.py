import sys
import unittest
from pathlib import Path
from types import SimpleNamespace
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'runtime/models'))
from load_progress import weight_progress

class LoadProgressTests(unittest.TestCase):
    def test_reports_real_percent_and_restores_binding(self):
        original = lambda: SimpleNamespace()
        binding = SimpleNamespace(llama_model_default_params=original, llama_progress_callback=lambda fn:fn)
        events = []
        with weight_progress(binding, events.append):
            callback = binding.llama_model_default_params().progress_callback
            for value in [0, .37, .37, float('nan'), 1]:
                self.assertTrue(callback(value, None))
        self.assertEqual([event['percent'] for event in events], [0, 37, 100])
        self.assertIs(binding.llama_model_default_params, original)

    def test_restores_actual_submodule_after_constructor_failure(self):
        original = lambda: SimpleNamespace()
        inner = SimpleNamespace(llama_model_default_params=original, llama_progress_callback=lambda fn:fn)
        with self.assertRaisesRegex(ValueError, 'allocation'):
            with weight_progress(SimpleNamespace(llama_cpp=inner), lambda _:None):
                raise ValueError('allocation')
        self.assertIs(inner.llama_model_default_params, original)
