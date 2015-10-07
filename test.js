import childProcess from 'child_process';
import test from 'ava';

test(t => {
	t.plan(2);

	childProcess.execFile('./cli.js', {cwd: __dirname}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout.trim().length > 0);
	});
});
