import test from 'ava';
import execa from 'execa';

test('main', async t => {
	t.true((await execa.stdout('./cli.js', {cwd: __dirname})).length > 0);
});
